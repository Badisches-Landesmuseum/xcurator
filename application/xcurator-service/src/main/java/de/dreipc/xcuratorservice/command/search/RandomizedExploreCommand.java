package de.dreipc.xcuratorservice.command.search;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSearchInput;
import de.dreipc.xcuratorservice.data.explorer.domain.ExploreSearchResult;
import de.dreipc.xcuratorservice.data.explorer.domain.StorySearchInput;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Slf4j
@Component
public class RandomizedExploreCommand {

    private final ExploreSearchCommand exploreSearchCommand;
    private final Random random;
    private final Map<Locale, List<ArtefactSearchInput>> PRE_DEFINED_QUERIES = Map.of(
            Locale.GERMAN, new ArrayList<>(), Locale.ENGLISH, new ArrayList<>(), new Locale("nl"), new ArrayList<>());

    private final Map<Locale, List<String>> PRE_DEFINED_QUERY_STRINGS = Map.of(
            Locale.GERMAN, new ArrayList<>(), Locale.ENGLISH, new ArrayList<>(), new Locale("nl"), new ArrayList<>());

    public RandomizedExploreCommand(ExploreSearchCommand exploreSearchCommand) {
        this.exploreSearchCommand = exploreSearchCommand;
        this.random = new Random();

        var jsonMapper = new ObjectMapper();
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("random-query.json")) {
            var jsonNode = jsonMapper.readTree(inputStream);
            jsonNode.get("queryStrings").elements().forEachRemaining(queryNode -> {
                PRE_DEFINED_QUERY_STRINGS
                        .get(Locale.GERMAN)
                        .add(queryNode.get("de").asText());
                PRE_DEFINED_QUERY_STRINGS
                        .get(Locale.ENGLISH)
                        .add(queryNode.get("en").asText());
                PRE_DEFINED_QUERY_STRINGS
                        .get(new Locale("nl"))
                        .add(queryNode.get("nl").asText());

                var de = ArtefactSearchInput.builder()
                        .queryString(queryNode.get("de").asText())
                        .language(Locale.GERMAN)
                        .build();
                var en = ArtefactSearchInput.builder()
                        .queryString(queryNode.get("en").asText())
                        .language(Locale.ENGLISH)
                        .build();
                var nl = ArtefactSearchInput.builder()
                        .queryString(queryNode.get("nl").asText())
                        .language(new Locale("nl"))
                        .build();

                PRE_DEFINED_QUERIES.get(Locale.GERMAN).add(de);
                PRE_DEFINED_QUERIES.get(Locale.ENGLISH).add(en);
                PRE_DEFINED_QUERIES.get(new Locale("nl")).add(nl);
            });
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new RuntimeException("Unable to load pre defined query Strings");
        }
        log.info("Initialized " + PRE_DEFINED_QUERIES.get(Locale.GERMAN).size() + " query Strings");
    }

    public String randomQueryString(Locale language) {
        if (!PRE_DEFINED_QUERY_STRINGS.containsKey(language))
            throw new IllegalArgumentException("Language " + language + " is not supported.");
        var queryInput = PRE_DEFINED_QUERY_STRINGS.get(language);
        var randomIndex = random.nextInt(queryInput.size());
        return PRE_DEFINED_QUERY_STRINGS.get(language).get(randomIndex);
    }

    public ExploreSearchResult execute(Locale language, int take) {
        if (!PRE_DEFINED_QUERIES.containsKey(language))
            throw new IllegalArgumentException("Language " + language + " is not supported.");
        var queryInput = PRE_DEFINED_QUERIES.get(language);
        var randomIndex = random.nextInt(queryInput.size());
        return search(randomIndex, language, take);
    }

    public ExploreSearchResult search(int index, Locale language, int take) {
        var artefactQuery = PRE_DEFINED_QUERIES.get(language).get(index);

        int storyCount = 5;
        var storyQuery = StorySearchInput.builder()
                .language(language)
                .queryString(artefactQuery.getQueryString())
                .maxCount(storyCount)
                .build();
        return exploreSearchCommand.execute(artefactQuery, storyQuery, take);
    }
}
