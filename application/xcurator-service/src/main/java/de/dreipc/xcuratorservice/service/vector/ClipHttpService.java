package de.dreipc.xcuratorservice.service.vector;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.exception.ExternalApiNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Component
public class ClipHttpService implements VectorService {

    private final HttpClient client;
    private final URI requestUrl;
    private final ObjectMapper jsonMapper;

    @Autowired
    public ClipHttpService(@Value("${clip-http.url}") URI requestUrl) {
        this(requestUrl, new ObjectMapper(), HttpClient.newBuilder().build());
    }

    public ClipHttpService(@Value("${clip-http.url}") URI requestUrl, ObjectMapper jsonMapper, HttpClient client) {
        this.jsonMapper = jsonMapper;
        this.client = client;
        this.requestUrl = requestUrl;
    }

    private HttpRequest buildRequest(String textInput) {
        return HttpRequest.newBuilder()
                .uri(requestUrl)
                .POST(HttpRequest.BodyPublishers.ofString("{\"text\": \"" + textInput + "\"}"))
                .setHeader("Content-Type", "application/json")
                .build();
    }

    @Override
    public List<Float> toVector(String text) throws ExternalApiNotAvailableException {
        var request = buildRequest(text);

        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != HttpStatus.OK.value())
                throw new ExternalApiNotAvailableException(
                        "Unable to request clip vector. API: " + request.uri() + " Reason: " + response.body());
            return jsonMapper.readValue(response.body(), new TypeReference<List<Float>>() {});
        } catch (IOException | InterruptedException e) {
            throw new ExternalApiNotAvailableException(
                    "Unable to request clip vector. API: " + request.uri() + " Reason: " + e.getMessage());
        }
    }
}
