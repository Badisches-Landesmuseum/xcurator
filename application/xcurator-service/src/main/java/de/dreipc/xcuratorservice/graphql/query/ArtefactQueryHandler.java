package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.*;
import de.dreipc.xcuratorservice.command.search.SimilarArtefactCommand;
import de.dreipc.xcuratorservice.data.artefact.*;
import de.dreipc.xcuratorservice.data.artefact.Licence;
import de.dreipc.xcuratorservice.data.explorer.SearchTagType;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import de.dreipc.xcuratorservice.graphql.dataloader.ArtefactDataLoader;
import dreipc.graphql.types.*;
import graphql.execution.DataFetcherResult;
import org.bson.types.ObjectId;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@DgsComponent
public class ArtefactQueryHandler {

    private final SimilarArtefactCommand similarArtefactCommand;

    public ArtefactQueryHandler(SimilarArtefactCommand similarArtefactCommand) {
        this.similarArtefactCommand = similarArtefactCommand;
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<Artefact>> artefact(
            @InputArgument ArtefactUniqueInput where, DgsDataFetchingEnvironment env) {
        if (!ObjectId.isValid(where.getId()))
            throw new IllegalArgumentException("Given id (" + where.getId() + ") is not a valid ObjectId (MongoDB)");

        var id = new ObjectId(where.getId());
        var language = where.getLanguage();

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(null, new Locale(language.name()));

        var dataLoader = env.<ObjectId, Artefact>getDataLoader(ArtefactDataLoader.class);
        return dataLoader.load(id).thenApply(data -> DataFetcherResult.<Artefact>newResult()
                .data(data)
                .localContext(localContext)
                .build());
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<List<Artefact>>> searchSimilarArtefacts(
            @InputArgument ArtefactUniqueInput where, @InputArgument int take, DgsDataFetchingEnvironment env)
            throws IOException {
        if (!ObjectId.isValid(where.getId()))
            throw new IllegalArgumentException("Given id (" + where.getId() + ") is not a valid ObjectId (MongoDB)");

        var id = new ObjectId(where.getId());
        var language = new Locale(where.getLanguage().name());

        var artefactIds = similarArtefactCommand.execute(id, language, take);
        var dataLoader = env.<ObjectId, Artefact>getDataLoader(ArtefactDataLoader.class);

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(null, language);

        return dataLoader.loadMany(artefactIds).thenApply(data -> DataFetcherResult.<List<Artefact>>newResult()
                .data(data)
                .localContext(localContext)
                .build());
    }

    @DgsData(parentType = "Artefact")
    public CompletableFuture<String> title(DgsDataFetchingEnvironment dfe) {
        Artefact artefact = dfe.getSource();

        UserIdLanguageLocalContext localContext = dfe.getLocalContext();
        Locale language = localContext.language();

        return CompletableFuture.supplyAsync(() -> artefact.getTitle().get(language));
    }

    @DgsData(parentType = "Artefact")
    public CompletableFuture<String> description(DgsDataFetchingEnvironment dfe) {
        Artefact artefact = dfe.getSource();

        UserIdLanguageLocalContext localContext = dfe.getLocalContext();
        Locale language = localContext.language();

        return CompletableFuture.supplyAsync(() -> artefact.getDescription().get(language));
    }

    @DgsData(parentType = "Artefact")
    public CompletableFuture<List<NamedEntity>> entities(DgsDataFetchingEnvironment dfe) {
        Artefact artefact = dfe.getSource();

        UserIdLanguageLocalContext localContext = dfe.getLocalContext();
        return CompletableFuture.supplyAsync(() -> {
            var entities = artefact.getEntities();
            if (entities == null) return Collections.emptyList();

            // remove entities that have the same start position
            return entities.getOrDefault(localContext.language(), Collections.emptyList()).stream()
                    .collect(Collectors.collectingAndThen(
                            Collectors.toCollection(
                                    () -> new TreeSet<>(Comparator.comparing(NamedEntity::getStartPosition))),
                            ArrayList::new));
        });
    }

    @DgsData(parentType = "Artefact")
    public Set<SearchTag> tags(DgsDataFetchingEnvironment dfe) {
        Artefact artefact = dfe.getSource();
        UserIdLanguageLocalContext localContext = dfe.getLocalContext();

        Locale language = localContext.language();

        var tags = new HashSet<SearchTag>();
        tags.addAll(toTag(artefact.getKeywords(), SearchTagType.KEYWORD));
        tags.addAll(toTag(artefact.getMaterials(), SearchTagType.MATERIAL));
        tags.addAll(toTag(artefact.getTechniques(), SearchTagType.TECHNIQUE));

        var personNames = artefact.getPersons().stream().map(Person::getName).toList();
        tags.addAll(toTag(personNames, SearchTagType.PERSON));

        var locationNames =
                artefact.getLocations().stream().map(Location::getName).toList();
        tags.addAll(toTag(locationNames, SearchTagType.LOCATION));

        if (artefact.getEntities() != null) {
            var personEntity = artefact.getEntities().getOrDefault(language, new ArrayList<>()).stream()
                    .filter(entity -> entity.getType().equalsIgnoreCase("PER"))
                    .map(NamedEntity::getLiteral)
                    .toList();
            tags.addAll(toAITag(personEntity, SearchTagType.ENTITY_PERSON));

            var locationEntity = artefact.getEntities().getOrDefault(language, new ArrayList<>()).stream()
                    .filter(entity -> entity.getType().equalsIgnoreCase("LOC"))
                    .map(NamedEntity::getLiteral)
                    .toList();
            tags.addAll(toAITag(locationEntity, SearchTagType.ENTITY_PERSON));

            var organisationEntity = artefact.getEntities().getOrDefault(language, new ArrayList<>()).stream()
                    .filter(entity -> entity.getType().equalsIgnoreCase("ORG"))
                    .map(NamedEntity::getLiteral)
                    .toList();
            tags.addAll(toAITag(organisationEntity, SearchTagType.ENTITY_ORGANISATION));
        }

        return tags;
    }

    @DgsData(parentType = "DataSource")
    public CompletableFuture<Language> language(DgsDataFetchingEnvironment dfe) {
        DataSource dataSource = dfe.getSource();

        return CompletableFuture.supplyAsync(
                () -> Language.valueOf(dataSource.getLanguage().toUpperCase()));
    }

    @DgsData(parentType = "NamedEntity")
    public CompletableFuture<List<LinkedDataBySource>> linkedData(DgsDataFetchingEnvironment dfe) {
        NamedEntity namedEntity = dfe.getSource();
        return CompletableFuture.supplyAsync(() -> namedEntity.getLinkedData().entrySet().stream()
                .map(link -> {
                    var source = LinkedDataSource.valueOf(link.getKey().toUpperCase());
                    return new LinkedDataBySource(source, link.getValue());
                })
                .toList());
    }

    private List<SearchTag> toTag(List<String> elements, SearchTagType type) {
        var graphqlType = castSearchTagEnum(type);
        return elements.stream()
                .map(item -> new SearchTag(item, graphqlType, false))
                .toList();
    }

    private List<SearchTag> toAITag(List<String> elements, SearchTagType type) {
        var graphqlType = castSearchTagEnum(type);
        return elements.stream()
                .map(item -> new SearchTag(item, graphqlType, true))
                .toList();
    }

    private static <E1 extends Enum<E1>> dreipc.graphql.types.SearchTagType castSearchTagEnum(E1 input) {
        int pos = input.ordinal();
        return dreipc.graphql.types.SearchTagType.class.getEnumConstants()[pos];
    }

    @DgsData(parentType = "Licence")
    public URL url(DgsDataFetchingEnvironment dfe) throws MalformedURLException {
        Licence licence = dfe.getSource();
        UserIdLanguageLocalContext localContext = dfe.getLocalContext();
        Locale language = localContext.language();

        var url = licence.getUrl();
        var length = url.toExternalForm().length();
        var languageSpecificUrl = url.toExternalForm().substring(0, length - 2) + language.getLanguage();
        return URI.create(languageSpecificUrl).toURL();
    }
}
