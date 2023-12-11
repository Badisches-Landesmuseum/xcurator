package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.data.explorer.domain.TextAspectInput;
import de.dreipc.xcuratorservice.service.vector.VectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Component
public class TextAspect implements ArtefactAspect<TextAspectInput> {
    private final VectorService vectorService;
    private final ObjectMapper jsonMapper;

    @Value("${search.vector.min-score}")
    float minVectorScore;

    public TextAspect(VectorService vectorService) {
        this(vectorService, new ObjectMapper());
    }

    @Autowired
    public TextAspect(VectorService vectorService, ObjectMapper jsonMapper) {
        this.vectorService = vectorService;
        this.jsonMapper = jsonMapper;
    }

    private List<Float> toVector(String query) {
        if (query == null || vectorService == null || query.isEmpty()) return Collections.emptyList();
        return vectorService.toVector(query);
    }

    private String keywordSearch(String query, Locale language) {
        // language=json
        var queryTemplate =
                """
                {
                  "simple_query_string": {
                    "query": "<QUERY_STRING>",
                    "fields": ["title.<LANGUAGE>^5", "description.<LANGUAGE>", "keywords^1.3"]
                  }
                }
                 """;

        return queryTemplate.replace("<QUERY_STRING>", query).replace("<LANGUAGE>", language.getLanguage());
    }

    private String vectorSearch(String query) {
        var vector = toVector(query);

        // language=json
        var queryTemplate =
                """
                  {
                    "function_score": {
                      "query": {
                          "elastiknn_nearest_neighbors": {
                            "field": "embedding",
                            "vec": {
                                "values": <VECTOR>
                            },
                            "model": "lsh",
                            "similarity": "cosine",
                            "candidates": 1000
                          }
                      },
                      "min_score": <VECTOR_MIN_SCORE>
                    }
                  }
                """;

        return queryTemplate
                .replace("<VECTOR>", vector.toString())
                .replace("<VECTOR_MIN_SCORE>", String.valueOf(minVectorScore));
    }

    @Override
    public Optional<JsonNode> query(TextAspectInput input) {
        if (input.text().isEmpty()) {
            var wildcardInput = "*";
            var query = keywordSearch(wildcardInput, input.language());
            return Optional.of(toJson(query, input));
        }

        var query = keywordSearch(input.text(), input.language());
        query += "," + vectorSearch(input.text());

        // language=json
        var combinedQuery =
                """
                {
                    "bool" : {
                      "should" : [
                        <QUERIES>
                      ]
                    }
                }
                """
                        .replace("<QUERIES>", query);

        return Optional.of(toJson(combinedQuery, input));
    }

    @Override
    public Optional<JsonNode> facette() {
        return Optional.empty();
    }

    @Override
    public Optional<JsonNode> boost(TextAspectInput input, float weight) {
        return Optional.empty();
    }

    private JsonNode toJson(String query, TextAspectInput input) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "unable to parse text aspect query with input (input: " + input.text() + " language: "
                            + input.language().getLanguage() + ")!",
                    e);
        }
    }
}
