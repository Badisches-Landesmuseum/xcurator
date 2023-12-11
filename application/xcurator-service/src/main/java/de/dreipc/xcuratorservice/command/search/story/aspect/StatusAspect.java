package de.dreipc.xcuratorservice.command.search.story.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class StatusAspect implements StoryAspect<Boolean> {
    private final ObjectMapper jsonMapper = new ObjectMapper();

    @Override
    public Optional<JsonNode> query(Boolean isPublished) {
        // language=json
        var query =
                """
            {
              "bool" : {
                "must" : [
                  {"term" : {"isDeleted" : "false" }},
                  {"term" : {"isPublished": "<PUBLISHED>" }}
                ]
              }
            }
            """
                        .replace("<PUBLISHED>", String.valueOf(isPublished));

        return Optional.of(toJson(query, isPublished));
    }

    private JsonNode toJson(String query, boolean isPublished) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "unable to parse status aspect query with input (isPublished: " + isPublished + ")!", e);
        }
    }
}
