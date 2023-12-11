package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.*;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.command.search.*;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSearchInput;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSourceOwner;
import de.dreipc.xcuratorservice.data.explorer.domain.Material;
import de.dreipc.xcuratorservice.data.explorer.domain.StorySearchInput;
import de.dreipc.xcuratorservice.data.explorer.domain.TagAspectInput;
import de.dreipc.xcuratorservice.data.profile.UserProfileRepository;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import de.dreipc.xcuratorservice.service.CountryService;
import de.dreipc.xcuratorservice.service.PersonalisationService;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.*;
import graphql.execution.DataFetcherResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;

@DgsComponent
public class SearchQueryHandler {

    private final UserProfileRepository userProfileRepository;
    private final ExploreSearchCommand exploreSearchCommand;
    private final ExploreSearchConverter searchConverter;
    private final RandomizedExploreCommand randomizedExploreCommand;
    private final AutoSuggestCommand autoSuggestCommand;
    private final CountryService localeService;
    private final SuggestRelatedArtefactsCommand suggestRelatedArtefactsCommand;

    public SearchQueryHandler(
            UserProfileRepository userProfileRepository,
            ExploreSearchCommand exploreSearchCommand,
            ExploreSearchConverter searchConverter,
            RandomizedExploreCommand randomizedExploreCommand,
            AutoSuggestCommand autoSuggestCommand,
            CountryService localeService,
            SuggestRelatedArtefactsCommand suggestRelatedArtefactsCommand) {
        this.userProfileRepository = userProfileRepository;
        this.exploreSearchCommand = exploreSearchCommand;
        this.searchConverter = searchConverter;
        this.randomizedExploreCommand = randomizedExploreCommand;
        this.autoSuggestCommand = autoSuggestCommand;
        this.localeService = localeService;
        this.suggestRelatedArtefactsCommand = suggestRelatedArtefactsCommand;
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<List<Artefact>>> suggestRelatedArtefacts(
            @InputArgument SuggestRelatedArtefactsInput where,
            @InputArgument Integer take,
            DgsDataFetchingEnvironment env) {
        var storyTitle = where.getStoryTitle();
        var language = new Locale(where.getLanguage().name());

        var artefactInput = ArtefactSearchInput.builder().language(language).queryString(storyTitle);
        SpringSecurityContext context = DgsContext.getCustomContext(env);

        var user = (DreipcUser) context.currentUser();
        var userId = user.getId();

        userProfileRepository.findById(userId).ifPresent(profile -> {
            if (profile.getContinents() != null)
                profile.getContinents().stream().map(Enum::name).forEach(artefactInput::preferredContinent);

            if (profile.getMaterials() != null)
                profile.getMaterials().stream()
                        .map(PersonalisationService::materials)
                        .flatMap(List::stream)
                        .forEach(artefactInput::preferredMaterial);
            if (profile.getEpochs() != null)
                profile.getEpochs().stream()
                        .map(PersonalisationService::epoch)
                        .flatMap(List::stream)
                        .forEach(artefactInput::preferredEpochName);
        });
        var localContext = new UserIdLanguageLocalContext(userId, language);

        return CompletableFuture.supplyAsync(() -> suggestRelatedArtefactsCommand.execute(artefactInput.build(), take))
                .thenApply(result -> DataFetcherResult.<List<Artefact>>newResult()
                        .data(result)
                        .localContext(localContext)
                        .build());
    }

    @DgsQuery
    public DataFetcherResult<List<SearchSuggest>> suggestExplore(@InputArgument SuggestExploreInput where) {
        var language = new Locale(where.getLanguage().name());

        var suggestions = new ArrayList<SearchSuggest>();
        if (!where.getQueryText().isEmpty()) {
            suggestions.addAll(autoSuggestCommand.suggest(where.getQueryText(), language, where.getLimit()));
        }
        return DataFetcherResult.<List<SearchSuggest>>newResult()
                .data(suggestions)
                .localContext(language)
                .build();
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<ExploreSearchResult>> searchExplore(
            @InputArgument ExploreSearchInput where, @InputArgument Integer take, DgsDataFetchingEnvironment env) {
        var query = where.getQuery().replaceAll("[\",']", "");
        var language = new Locale(where.getLanguage().name());
        int storyCount = 5;

        var colors = where.getColors().stream().map(Enum::name).toList();
        var epochs = where.getEpochs().stream().map(Enum::name).toList();
        var owners = where.getOwner().stream()
                .map(inputEnum -> castEnum(inputEnum, ArtefactSourceOwner.class))
                .map(ArtefactSourceOwner::value)
                .toList();

        var tagInput = TagAspectInput.builder()
                .language(language)
                .tags(where.getTags())
                .build();

        var countries = toIsoCodes(where.getLocations(), language);
        var materials = where.getMaterials().stream()
                .map(inputEnum -> castEnum(inputEnum, Material.class))
                .map(Material::value)
                .toList();

        var artefactInput = ArtefactSearchInput.builder()
                .language(language)
                .queryString(query)
                .colors(colors)
                .epochs(epochs)
                .owners(owners)
                .countries(countries)
                .tags(tagInput)
                .materials(materials);

        var storyInput = StorySearchInput.builder()
                .language(language)
                .queryString(query)
                .maxCount(storyCount)
                .build();

        SpringSecurityContext context = DgsContext.getCustomContext(env);
        String userId = null;
        if (context.isAuthenticated()) {
            var user = (DreipcUser) context.currentUser();
            userId = user.getId();
            userProfileRepository.findById(userId).ifPresent(profile -> {
                if (profile.getContinents() != null)
                    profile.getContinents().stream().map(Enum::name).forEach(artefactInput::preferredContinent);

                if (profile.getMaterials() != null)
                    profile.getMaterials().stream()
                            .map(PersonalisationService::materials)
                            .flatMap(List::stream)
                            .forEach(artefactInput::preferredMaterial);
                if (profile.getEpochs() != null)
                    profile.getEpochs().stream()
                            .map(PersonalisationService::epoch)
                            .flatMap(List::stream)
                            .forEach(artefactInput::preferredEpochName);
            });
        }
        var localContext = new UserIdLanguageLocalContext(userId, language);

        return CompletableFuture.supplyAsync(
                        () -> exploreSearchCommand.execute(artefactInput.build(), storyInput, take))
                .thenComposeAsync(result -> searchConverter.convertResult(result, language, false))
                .thenApply(clusteredResult -> DataFetcherResult.<dreipc.graphql.types.ExploreSearchResult>newResult()
                        .data(clusteredResult)
                        .localContext(localContext)
                        .build());
    }

    public static <E1 extends Enum<E1>, E2 extends Enum<E2>> E2 castEnum(E1 input, Class<E2> e2) {
        int pos = input.ordinal();
        return e2.getEnumConstants()[pos];
    }

    private List<String> toIsoCodes(List<String> countryNames, Locale language) {
        return countryNames.stream()
                .map(countryName -> localeService.isoCode(countryName, language))
                .toList();
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<ExploreSearchResult>> randomizedExplore(
            @InputArgument LanguageInput where, @InputArgument Integer take) {

        var language = new Locale(where.getLanguage().name());

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(null, language);

        return CompletableFuture.supplyAsync(() -> randomizedExploreCommand.execute(language, take))
                .thenComposeAsync(result -> searchConverter.convertResult(result, language, true))
                .thenApply(clusteredResult -> DataFetcherResult.<dreipc.graphql.types.ExploreSearchResult>newResult()
                        .data(clusteredResult)
                        .localContext(localContext)
                        .build());
    }

    @DgsQuery
    public String queryString(@InputArgument LanguageInput where) {
        var language = new Locale(where.getLanguage().name());
        return randomizedExploreCommand.randomQueryString(language);
    }

    @DgsData(parentType = "ContinentFacette")
    public int totalCount(DgsDataFetchingEnvironment dfe) {
        ContinentFacette continentFacette = dfe.getSource();
        return continentFacette.getCountries().stream()
                .mapToInt(CountryFacette::getCount)
                .sum();
    }
}
