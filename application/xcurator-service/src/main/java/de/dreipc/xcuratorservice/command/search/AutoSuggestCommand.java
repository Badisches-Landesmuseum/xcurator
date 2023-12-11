package de.dreipc.xcuratorservice.command.search;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import de.dreipc.elasticsearch.NativeJsonQuery;
import de.dreipc.xcuratorservice.exception.SearchParseException;
import dreipc.graphql.types.SearchSuggest;
import dreipc.graphql.types.SuggestType;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
public class AutoSuggestCommand {

    private static final String ARTEFACT_INDEX = "xcurator.artefact";
    private final NativeJsonQuery nativeJsonQuery;

    public AutoSuggestCommand(NativeJsonQuery nativeJsonQuery) {
        this.nativeJsonQuery = nativeJsonQuery;
    }

    // ToDo: handle limit or remove
    public List<SearchSuggest> suggest(String queryString, Locale language, int limit) {
        // language=json
        var query =
                """
                {
                  "_source": ["id"],
                    "size": 0,
                    "suggest": {
                      "text": "<QUERY_STRING>",
                        "title-suggest" : {
                            "completion" : {
                                "field" : "title.<LANGUAGE>.completion"
                            }
                        }
                    }
                }
                """
                        .replace("<QUERY_STRING>", queryString)
                        .replace("<LANGUAGE>", language.getLanguage());

        JsonNode jsonResult;
        try {
            jsonResult = nativeJsonQuery.search(query, ARTEFACT_INDEX);
        } catch (IOException e) {
            throw new SearchParseException("Unable to do suggestions for the explore search. Error: " + e.getMessage());
        }

        var titleSuggests = jsonResult.get("suggest").get("title-suggest");

        var suggestions = new HashSet<SearchSuggest>();
        if (titleSuggests instanceof ArrayNode results) {
            var artefactItems = toStream(results)
                    .map(jsonItem -> toItem(jsonItem, SuggestType.Artefact))
                    .flatMap(Set::stream)
                    .collect(Collectors.toSet());
            suggestions.addAll(artefactItems);
        }

        var suggestedList = new ArrayList<>(suggestions);
        if (suggestedList.size() > 10) {
            return suggestedList.subList(0, 10);
        } else {
            return suggestedList;
        }
    }

    private Stream<JsonNode> toStream(ArrayNode node) {
        return StreamSupport.stream(node.spliterator(), false);
    }

    private Set<SearchSuggest> toItem(JsonNode result, SuggestType type) {
        return toStream((ArrayNode) result.get("options"))
                .map(json -> {
                    var text = json.get("text").asText();
                    return SearchSuggest.newBuilder().text(text).type(type).build();
                })
                .collect(Collectors.toSet());
    }
}
