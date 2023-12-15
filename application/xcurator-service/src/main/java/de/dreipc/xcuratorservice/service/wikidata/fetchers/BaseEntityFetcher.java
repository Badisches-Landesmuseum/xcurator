package de.dreipc.xcuratorservice.service.wikidata.fetchers;

import com.fasterxml.jackson.databind.node.ArrayNode;
import de.dreipc.xcuratorservice.data.wiki.WikiDataBaseEntity;

import java.net.MalformedURLException;
import java.net.URI;
import java.util.List;
import java.util.stream.StreamSupport;

public class BaseEntityFetcher {

    public String query(List<String> ids, String language) {
        var convertIds = ids.stream().map(id -> "wd:" + id).toList();
        var valuesIds = String.join(" ", convertIds);

        return """
                SELECT ?entity ?title ?description ?image ?article
                WHERE
                {
                  VALUES ?entity { <ENTITY_IDS> }

                  ?entity rdfs:label ?title.
                  FILTER(lang(?title) = "<LANGUAGE_CODE>")

                  OPTIONAL {
                      ?entity schema:description ?description.
                      FILTER(lang(?description) = "<LANGUAGE_CODE>")
                  }

                    OPTIONAL {
                        ?entity wdt:P18 ?image.
                        ?article schema:about ?entity .
                        ?article schema:inLanguage "<LANGUAGE_CODE>" .
                        FILTER (SUBSTR(str(?article), 1, 25) = "https://<LANGUAGE_CODE>.wikipedia.org/")
                    }
                }
                LIMIT <LIMIT_COUNT>
                """
                .replace("<ENTITY_IDS>", valuesIds)
                .replace("<LIMIT_COUNT>", String.valueOf(convertIds.size()))
                .replaceAll("<LANGUAGE_CODE>", language);
    }

    public List<WikiDataBaseEntity> convert(ArrayNode jsonArrayNode) {
        return StreamSupport.stream(jsonArrayNode.spliterator(), false)
                .map(node -> {
                    try {
                        var idUrl = node.get("entity").get("value").asText();
                        var id = idUrl.substring(idUrl.lastIndexOf("/") + 1);
                        var imageUrl = node.has("image")
                                ? URI.create(node.get("image").get("value").asText())
                                        .toURL()
                                : null;
                        var articleUrl = node.has("article")
                                ? URI.create(node.get("article").get("value").asText())
                                        .toURL()
                                : null;
                        var description = node.has("description")
                                ? node.get("description").get("value").asText()
                                : null;

                        return WikiDataBaseEntity.builder()
                                .id(id)
                                .name(node.get("title").get("value").asText())
                                .description(description)
                                .articleUrl(articleUrl)
                                .imageUrl(imageUrl)
                                .build();
                    } catch (MalformedURLException e) {
                        throw new RuntimeException("given url by wikidata is not malformed.");
                    }
                })
                .toList();
    }
}
