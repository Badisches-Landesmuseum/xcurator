package de.dreipc.xcuratorservice.service.wikidata;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class WikiDataAPI {

    private final HttpClient client;
    private final String endpoint;
    private final ObjectMapper jsonMapper;

    public WikiDataAPI() {
        this(URI.create("https://query.wikidata.org/sparql"));
    }

    public WikiDataAPI(URI endpointUrl) {
        this.client = HttpClient.newHttpClient();
        this.jsonMapper = new ObjectMapper();
        this.endpoint = endpointUrl.toString();
    }

    public ArrayNode requestQuery(String sparqlQuery) {
        var encodedQuery = URLEncoder.encode(sparqlQuery, StandardCharsets.UTF_8);
        var requestUrl = String.format("%s?query=%s", endpoint, encodedQuery);
        var request = HttpRequest.newBuilder()
                .header("accept", "application/sparql-results+json")
                .uri(URI.create(requestUrl))
                .GET()
                .build();

        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            return (ArrayNode)
                    jsonMapper.readTree(response.body()).get("results").get("bindings");
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
