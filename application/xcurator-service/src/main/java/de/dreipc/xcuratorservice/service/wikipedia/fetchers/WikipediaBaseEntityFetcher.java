package de.dreipc.xcuratorservice.service.wikipedia.fetchers;

import com.fasterxml.jackson.databind.JsonNode;
import de.dreipc.xcuratorservice.data.wiki.WikiPediaBaseEntity;

import java.net.URL;

public class WikipediaBaseEntityFetcher {

    public static WikiPediaBaseEntity convert(JsonNode node, String titleId) {
        URL imageUrl = null;
        try {
            imageUrl = new URL(node.get("originalimage").get("source").asText());
        } catch (Exception e) {
        }

        URL articleUrl = null;
        try {
            articleUrl =
                    new URL(node.get("content_urls").get("desktop").get("page").asText());
        } catch (Exception e) {
        }

        String description = null;
        try {
            description = node.get("extract").asText();
        } catch (Exception e) {
        }

        var id = node.get("pageId") != null ? node.get("pageid").asText("") : titleId;
        var title = node.get("title") != null ? node.get("title").asText("") : titleId;

        return WikiPediaBaseEntity.builder()
                .description(description)
                .id(id)
                .name(title)
                .articleUrl(articleUrl)
                .imageUrl(imageUrl)
                .build();
    }
}
