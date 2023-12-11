package de.dreipc.xcuratorservice.service.wikidata.fetchers;

import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.data.util.Pair;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class NameFetcher {

    public String query(List<String> ids, String language) {
        var convertIds = ids.stream().map(id -> "wd:" + id).toList();
        var valuesIds = String.join(" ", convertIds);

        return String.format(
                """
                              SELECT ?entity ?title
                              WHERE
                              {
                                VALUES ?entity { %s }

                                ?entity rdfs:label ?title.
                                FILTER(lang(?title) = "%s")
                              }
                              LIMIT %s
                              """,
                valuesIds, language, convertIds.size());
    }

    public Map<String, String> convert(ArrayNode jsonArrayNode) {
        return StreamSupport.stream(jsonArrayNode.spliterator(), false)
                .map(node -> {
                    var idUrl = node.get("entity").get("value").asText();
                    var id = idUrl.substring(idUrl.lastIndexOf("/") + 1);
                    var title = node.get("title").get("value").asText("");
                    return Pair.of(id, title);
                })
                .collect(Collectors.toMap(Pair::getFirst, Pair::getSecond));
    }
}
