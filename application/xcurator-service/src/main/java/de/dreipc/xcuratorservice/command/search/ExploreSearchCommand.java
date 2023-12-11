package de.dreipc.xcuratorservice.command.search;

import com.fasterxml.jackson.databind.JsonNode;
import de.dreipc.elasticsearch.MultiIndexQuery;
import de.dreipc.xcuratorservice.command.search.artefact.ArtefactQueryBuilder;
import de.dreipc.xcuratorservice.command.search.artefact.ArtefactResultConverter;
import de.dreipc.xcuratorservice.command.search.story.StoryQueryBuilder;
import de.dreipc.xcuratorservice.command.search.story.StoryResultConverter;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.explorer.domain.*;
import de.dreipc.xcuratorservice.data.story.Story;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ExploreSearchCommand {

    private final ArtefactRepository artefactRepository;

    private static final String ARTEFACT_INDEX = "xcurator.artefact";

    private final ArtefactQueryBuilder artefactQueryBuilder;
    private final ArtefactResultConverter artefactResultConverter;

    private static final String STORY_INDEX = "xcurator.story";
    private final StoryQueryBuilder storyQueryBuilder;
    private final StoryResultConverter storyResultConverter;

    private final MultiIndexQuery multiIndexQuery;

    public ExploreSearchCommand(
            ArtefactRepository artefactRepository,
            ArtefactQueryBuilder artefactQueryBuilder,
            ArtefactResultConverter artefactResultConverter,
            StoryQueryBuilder storyQueryBuilder,
            StoryResultConverter storyResultConverter,
            MultiIndexQuery multiIndexQuery) {
        this.artefactRepository = artefactRepository;
        this.artefactQueryBuilder = artefactQueryBuilder;
        this.artefactResultConverter = artefactResultConverter;
        this.storyQueryBuilder = storyQueryBuilder;
        this.storyResultConverter = storyResultConverter;
        this.multiIndexQuery = multiIndexQuery;
    }

    public ExploreSearchResult execute(ArtefactSearchInput artefactInput, StorySearchInput storySearchInput, int take) {
        var resultBuilder = ExploreSearchResult.builder().queryString(artefactInput.getQueryString());
        try {
            var query = artefactQueryBuilder.buildQuery(artefactInput, take);
            var artefactQuery = new MultiIndexQuery.IndexQuery(ARTEFACT_INDEX, query);

            Map<String, JsonNode> result;

            query = storyQueryBuilder.buildQuery(storySearchInput);
            var storyQuery = new MultiIndexQuery.IndexQuery(STORY_INDEX, query);

            result = multiIndexQuery.executeSearch(List.of(artefactQuery, storyQuery));

            var storyResult = storyResultConverter.execute(result.get(STORY_INDEX));
            var storyResultCount = storyResult.size();
            toExploreItemResults(storyResult).forEach(resultBuilder::item);

            var artefactResult =
                    artefactResultConverter.execute(artefactInput.getQueryString(), result.get(ARTEFACT_INDEX));
            resultBuilder.facettes(artefactResult.getFacettes());
            artefactResult.getItems().stream()
                    .limit(take - storyResultCount)
                    .map(item -> new ExploreItemResult(item.id(), item.embedding(), item.score(), Artefact.class))
                    .forEach(resultBuilder::item);

            return resultBuilder.build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private List<ExploreItemResult> toExploreItemResults(List<StoryItemResult> storyResults) {
        var artefactIds =
                storyResults.stream().map(StoryItemResult::firstArtefactId).collect(Collectors.toSet());
        var embeddingsByArtefact = artefactRepository.findAllEmbeddingByIds(artefactIds);

        return storyResults.stream()
                .map(item -> {
                    var artefactId = item.firstArtefactId();
                    var embedding = embeddingsByArtefact.get(artefactId);
                    return new ExploreItemResult(item.id(), toArray(embedding), item.score(), Story.class);
                })
                .toList();
    }

    private float[] toArray(List<Float> floats) {
        final float[] arr = new float[floats.size()];
        int index = 0;
        for (final Float value : floats) {
            arr[index++] = value;
        }
        return arr;
    }
}
