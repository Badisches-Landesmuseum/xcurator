package de.dreipc.xcuratorservice.command.search.story;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.command.search.story.aspect.StatusAspect;
import de.dreipc.xcuratorservice.command.search.story.aspect.StoryAspect;
import de.dreipc.xcuratorservice.command.search.story.aspect.TitleAspect;
import de.dreipc.xcuratorservice.data.explorer.domain.StorySearchInput;
import de.dreipc.xcuratorservice.data.explorer.domain.TextAspectInput;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@SuppressWarnings("json")
public class StoryQueryBuilder {

    private final Map<Class<?>, StoryAspect<?>> aspects;
    private final ObjectMapper jsonMapper = new ObjectMapper();

    public StoryQueryBuilder(List<StoryAspect<?>> artefactAspects) {
        this.aspects = artefactAspects.stream().collect(Collectors.toMap(StoryAspect::getClass, elem -> elem));
    }

    public JsonNode buildQuery(StorySearchInput input) {
        var selectorPart = selectorQueryPart(input);
        var filterPart = filterQueryPart(input);

        // language=json
        var stringQuery =
                """
                        {
                          "_source": ["id", "modules.artefactIds"],
                          "size" : <TAKE>,
                          "query": {
                            "function_score": {
                              "query": {
                                "bool": {
                                  "must": [
                                   <MUST_QUERY>
                                  ],
                                  "filter" : [
                                   <FILTER_QUERY>
                                  ]
                                }
                              }
                            }
                          }
                        }
                        """
                        .replace("<MUST_QUERY>", selectorPart)
                        .replace("<FILTER_QUERY>", filterPart)
                        .replace("<TAKE>", String.valueOf(input.getMaxCount()));

        return toJson(stringQuery);
    }

    private String selectorQueryPart(StorySearchInput input) {
        var selectors = new ArrayList<JsonNode>();

        var textInput = new TextAspectInput(input.getQueryString() + "*", input.getLanguage());
        aspect(TitleAspect.class, TextAspectInput.class).query(textInput).ifPresent(selectors::add);

        return String.join(
                ",\n", selectors.stream().map(JsonNode::toPrettyString).toList());
    }

    private String filterQueryPart(StorySearchInput input) {
        var filters = new ArrayList<JsonNode>();

        aspect(StatusAspect.class, Boolean.class).query(input.getIsPublished()).ifPresent(filters::add);

        return String.join(",\n", filters.stream().map(JsonNode::toPrettyString).toList());
    }

    /*****************
     * HELPERS
     *****************/
    private JsonNode toJson(String query) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("unable to create explore query", e);
        }
    }

    @SuppressWarnings("unchecked")
    private <T> StoryAspect<T> aspect(Class<?> implementationClass, Class<T> inputClass) {
        return (StoryAspect<T>) aspects.get(implementationClass);
    }
}
