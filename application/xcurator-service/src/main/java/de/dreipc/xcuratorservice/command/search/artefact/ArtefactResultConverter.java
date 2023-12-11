package de.dreipc.xcuratorservice.command.search.artefact;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactItemResult;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSearchResult;
import de.dreipc.xcuratorservice.exception.SearchParseException;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
@Slf4j
@SuppressWarnings("json")
public class ArtefactResultConverter {
    private final ObjectMapper jsonMapper = new ObjectMapper();

    public ArtefactSearchResult execute(String queryString, JsonNode result) {
        ArrayNode foundArtefacts = (ArrayNode) result.get("hits").get("hits");
        var projectedArtefacts = toStream(foundArtefacts)
                .map(this::toItem)
                .filter(Objects::nonNull)
                .toList();

        var aggregates = result.get("aggregations").fields();
        var facettes = StreamSupport.stream(Spliterators.spliteratorUnknownSize(aggregates, Spliterator.ORDERED), false)
                .map(field -> {
                    if (field.getValue().has(field.getKey()))
                        return Map.entry(field.getKey(), field.getValue().get(field.getKey()));
                    else return field;
                })
                .filter(field -> field.getValue().has("buckets"))
                .collect(Collectors.toMap(Map.Entry::getKey, elem -> facetteCategoryToCountMap(elem.getValue())));

        return ArtefactSearchResult.builder()
                .queryString(queryString)
                .items(projectedArtefacts)
                .facettes(facettes)
                .build();
    }

    private ArtefactItemResult toItem(JsonNode result) {
        try {
            var idString = result.get("_id").asText();
            if (!ObjectId.isValid(idString)) {
                log.warn("Retrieved Object from elastic with bad a id: " + idString);
                return null;
            }
            var id = new ObjectId(idString);
            var score = (float) result.get("_score").asDouble();

            String embeddingArrayJson = result.get("_source").get("embedding").toPrettyString();
            float[] embedding = jsonMapper.readValue(embeddingArrayJson, float[].class);

            return new ArtefactItemResult(id, embedding, score);
        } catch (JsonProcessingException e) {
            throw new SearchParseException(
                    "Unable to read embedding value from elastic search. Error: " + e.getMessage());
        }
    }

    private Map<String, Integer> facetteCategoryToCountMap(JsonNode facetNode) {
        ArrayNode arrayNode = (ArrayNode) facetNode.get("buckets");
        if (arrayNode.isEmpty()) return Collections.emptyMap();

        return toStream(arrayNode)
                .collect(Collectors.toMap(
                        elem -> (elem.get("key_as_string") == null
                                ? elem.get("key").asText()
                                : elem.get("key_as_string").asText()),
                        elem -> elem.get("doc_count").asInt(0)));
    }

    private Stream<JsonNode> toStream(ArrayNode node) {
        return StreamSupport.stream(node.spliterator(), false);
    }
}
