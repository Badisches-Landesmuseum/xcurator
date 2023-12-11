package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class OwnerAspect implements ArtefactAspect<List<String>> {
    private final ObjectMapper jsonMapper = new ObjectMapper();

    @Override
    public Optional<JsonNode> query(List<String> ownerNames) {
        if (ownerNames.isEmpty()) return Optional.empty();

        var joinedOwner = String.join(
                ",", ownerNames.stream().map(elem -> "\"" + elem + "\"").toList());
        // language=json
        var template =
                """
                     {
                       "terms": { "sourceInfo.owner.keyword": [ <OWNERS> ] }
                     }
                """
                        .replace("<OWNERS>", joinedOwner);

        return Optional.of(toJson(template, ownerNames));
    }

    private JsonNode toJson(String query, List<String> ownerNames) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "unable to create owner query filter with input (" + String.join(",", ownerNames) + ")", e);
        }
    }

    @Override
    public Optional<JsonNode> facette() {
        // language=json
        var aggregate =
                """
                        {
                            "terms": {
                                "field": "sourceInfo.owner.keyword",
                                "min_doc_count": 0
                            }
                        }
                        """;
        return Optional.of(toJson(aggregate, Collections.emptyList()));
    }

    @Override
    public Optional<JsonNode> boost(List<String> input, float weight) {
        return Optional.empty();
    }
}
