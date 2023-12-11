package de.dreipc.xcuratorservice.service.wikipedia;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dreipc.common.graphql.exception.NotFoundException;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class WikiPediaAPI {

    private final HttpClient client;
    private final ObjectMapper jsonMapper;

    public WikiPediaAPI() {
        this.client = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();
        this.jsonMapper = new ObjectMapper();
    }

    public URI generateUrl(String languageCode, String title) throws URISyntaxException {
        title = title.trim().replace(" ", "_");
        var requestUrl = "https://<LANGUAGE_CODE>.wikipedia.org/api/rest_v1/page/summary/<TITLE_VALUE>"
                .replace("<LANGUAGE_CODE>", languageCode.toLowerCase())
                .replace("<TITLE_VALUE>", title);
        return new URI(requestUrl);
    }

    public JsonNode requestQuery(String title, String language) {
        try {
            var requestUrl = generateUrl(language, title);
            var request = HttpRequest.newBuilder()
                    .header("accept", "application/json")
                    .uri(requestUrl)
                    .GET()
                    .build();

            var response = client.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() == 404)
                throw new NotFoundException("Wikipedia summary entry not found for element: " + title);
            return jsonMapper.readTree(response.body());
        } catch (IOException | URISyntaxException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
