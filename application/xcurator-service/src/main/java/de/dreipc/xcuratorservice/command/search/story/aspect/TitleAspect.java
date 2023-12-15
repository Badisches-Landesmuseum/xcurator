package de.dreipc.xcuratorservice.command.search.story.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.data.explorer.domain.TextAspectInput;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class TitleAspect implements StoryAspect<TextAspectInput> {

    private ObjectMapper jsonMapper = new ObjectMapper();

    @Override
    public Optional<JsonNode> query(TextAspectInput input) {
        if (input.text().isEmpty()) {
            input = new TextAspectInput("*", input.language());
        }
        ;

        // language=json
        var query =
                """
                {
          "bool" : {
            "must" : [
              {
                "simple_query_string": {
                  "query": "<QUERY_STRING>",
                  "fields": ["title"]
                }
              },
              {  "term" : {  "language.keyword" : "<LANGUAGE>" } }
            ]
          }
        }
        """
                        .replace("<QUERY_STRING>", input.text())
                        .replace("<LANGUAGE>", input.language().getLanguage().toUpperCase());

        return Optional.of(toJson(query, input));
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
