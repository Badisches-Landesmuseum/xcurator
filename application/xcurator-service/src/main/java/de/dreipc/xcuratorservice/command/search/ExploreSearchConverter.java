package de.dreipc.xcuratorservice.command.search;

import de.dreipc.xcuratorservice.command.search.artefact.aspect.*;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.explorer.ExploreItem;
import de.dreipc.xcuratorservice.data.explorer.domain.*;
import de.dreipc.xcuratorservice.data.explorer.navigu.NaviguResult;
import de.dreipc.xcuratorservice.data.explorer.navigu.NavinguInputElement;
import de.dreipc.xcuratorservice.data.profile.Continent;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.service.CountryService;
import de.dreipc.xcuratorservice.service.NavinguService;
import dreipc.common.graphql.exception.NotFoundException;
import dreipc.graphql.types.*;
import dreipc.graphql.types.ArtefactSourceOwner;
import dreipc.graphql.types.ExploreItemSize;
import dreipc.graphql.types.ExploreSearchResult;
import dreipc.graphql.types.Material;
import graphql.com.google.common.base.Splitter;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class ExploreSearchConverter {

    private final ArtefactRepository artefactRepository;
    private final StoryRepository storyRepository;
    private final NavinguService navinguService;

    private final CountryService localeService;

    public ExploreSearchConverter(
            ArtefactRepository artefactRepository,
            StoryRepository storyRepository,
            NavinguService navinguService,
            CountryService localeService) {
        this.artefactRepository = artefactRepository;
        this.storyRepository = storyRepository;
        this.navinguService = navinguService;
        this.localeService = localeService;
    }

    @SuppressWarnings(value = {"unused", "all"}) // warnings are related to the cache setting!
    @Cacheable(
            value = "search-cluster",
            key = "{#result.getQueryString(), #language.getLanguage()}",
            condition = "#isRandom")
    public CompletableFuture<ExploreSearchResult> convertResult(
            de.dreipc.xcuratorservice.data.explorer.domain.ExploreSearchResult result,
            Locale language,
            boolean isRandom) {

        var artefactIds = result.getItems().stream()
                .filter(item -> item.objectClass().equals(Artefact.class))
                .map(ExploreItemResult::id)
                .toList();
        var artefacts = CompletableFuture.supplyAsync(() -> artefactRepository.findAllById(artefactIds));

        var storyIds = result.getItems().stream()
                .filter(item -> item.objectClass().equals(Story.class))
                .map(ExploreItemResult::id)
                .toList();
        var stories = CompletableFuture.supplyAsync(() -> storyRepository.findAllById(storyIds));

        var embeddingsByIdentifier = embeddingsByIdentifier(result.getItems());
        var exploreResultFuture = navinguService.clusterByEmbeddings(embeddingsByIdentifier);

        return CompletableFuture.allOf(artefacts, stories, exploreResultFuture).thenApply(v -> {
            Stream<ExploreItem> allObjects = Stream.concat(artefacts.join().stream(), stories.join().stream());
            var objectsById = allObjects.collect(Collectors.toMap(
                    item -> item.getId().toString() + item.getClass().getSimpleName(), item -> item, (i1, i2) -> i1));
            var navinguResult = exploreResultFuture.join();
            var facette = convertFacette(result.getFacettes(), language);
            var bestMatch = result.getItems().stream()
                    .filter(item -> item.objectClass().equals(Artefact.class))
                    .max(Comparator.comparingDouble(ExploreItemResult::score))
                    .orElse(null);
            return convert(result.getQueryString(), objectsById, navinguResult, facette, bestMatch);
        });
    }

    private List<NavinguInputElement> embeddingsByIdentifier(List<ExploreItemResult> items) {
        return items.stream()
                .map(item -> {
                    var size = item.objectClass().equals(Artefact.class) ? 1 : 2;
                    return NavinguInputElement.builder()
                            .id(item.id())
                            .embedding(item.embedding())
                            .size(size)
                            .build();
                })
                .toList();
    }

    private ExploreFacette convertFacette(Map<String, Map<String, Integer>> facettes, Locale language) {
        var colors = facettes.get(ColorAspect.class.getSimpleName()).entrySet().stream()
                .map(entry -> ColorFacette.newBuilder()
                        .count(entry.getValue())
                        .color(ArtefactColor.valueOf(entry.getKey().toUpperCase()))
                        .build())
                .toList();
        var epochs = facettes.get(EpochAspect.class.getSimpleName()).entrySet().stream()
                .map(entry -> EpochFacette.newBuilder()
                        .count(entry.getValue())
                        .epoch(ArtefactEpoch.valueOf(entry.getKey()))
                        .build())
                .toList();
        var source = facettes.get(OwnerAspect.class.getSimpleName()).entrySet().stream()
                .map(entry -> SourceFacette.newBuilder()
                        .count(entry.getValue())
                        .owner(entry.getKey().startsWith("B") ? ArtefactSourceOwner.BLM : ArtefactSourceOwner.AP)
                        .build())
                .toList();

        var materials = facettes.get(MaterialAspect.class.getSimpleName()).entrySet().stream()
                .map(entry -> {
                    var material = Arrays.stream(de.dreipc.xcuratorservice.data.explorer.domain.Material.values())
                            .filter(elem -> elem.value().equals(entry.getKey()))
                            .findFirst()
                            .orElseThrow(() -> new NotFoundException("Unknown Material " + entry.getKey()));

                    return MaterialFacette.newBuilder()
                            .count(entry.getValue())
                            .material(Material.valueOf(material.name()))
                            .build();
                })
                .toList();
        Map<Continent, List<CountryFacette>> locationFacette = new HashMap<>();
        facettes.get(LocationAspect.class.getSimpleName()).forEach((key, value) -> {
            var continentCountry = Splitter.on('|').splitToList(key);
            var continent = Continent.valueOf(continentCountry.get(0));
            var countryCode = continentCountry.get(1);
            var countryName = localeService.countryName(countryCode, language);

            var countryFacette =
                    CountryFacette.newBuilder().name(countryName).count(value).build();

            if (locationFacette.containsKey(continent))
                locationFacette.get(continent).add(countryFacette);
            else {
                var countries = new ArrayList<CountryFacette>();
                countries.add(countryFacette);
                locationFacette.put(continent, countries);
            }
        });

        var location = locationFacette.entrySet().stream()
                .map(elem -> new ContinentFacette(
                        elem.getKey(), elem.getValue(), -1)) // total count is calculated on the fetcher
                .toList();

        return ExploreFacette.newBuilder()
                .colorFacette(colors)
                .epochFacette(epochs)
                .sourceFacette(source)
                .locationFacette(location)
                .materialFacette(materials)
                .build();
    }

    private ExploreSearchResult convert(
            String queryString,
            Map<String, ExploreItem> objects,
            NaviguResult naviguResult,
            ExploreFacette facette,
            ExploreItemResult bestMatch) {

        var items = naviguResult.getItems().stream()
                .map(elem -> {
                    var pin = new Pinning(elem.getPin().x(), elem.getPin().y());
                    var size = new ExploreItemSize(
                            elem.getSize().width(), elem.getSize().height());

                    var isStory = elem.getSize().width() > 1;
                    var objectType = isStory ? Story.class : Artefact.class;

                    var object = objects.get(elem.getRelatedObjectId() + objectType.getSimpleName());

                    return ExploreGridItem.newBuilder()
                            .item(object)
                            .pinning(pin)
                            .size(size)
                            .build();
                })
                .filter(item -> item.getItem() != null) // stories not loaded here? why?
                .toList();

        ExploreGridItem bestMatchItem = null;
        if (bestMatch != null) {
            bestMatchItem = items.stream()
                    .filter(item -> item.getItem().getId().equals(bestMatch.id()))
                    .findFirst()
                    .orElse(null);
        }

        return ExploreSearchResult.newBuilder()
                .queryString(queryString)
                .items(items)
                .gridInfo(naviguResult.getGridInfo())
                .facette(facette)
                .bestMatch(bestMatchItem)
                .build();
    }
}
