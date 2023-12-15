package de.dreipc.xcuratorservice.service.llm;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.exception.ExternalApiNotAvailableException;
import org.intellij.lang.annotations.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService implements LLMService {

    private final HttpClient client;
    private final OpenAIProperties properties;
    private final ObjectMapper jsonMapper;

    @Autowired
    public OpenAIService(OpenAIProperties properties, ObjectMapper jsonMapper) {
        this(
                properties,
                HttpClient.newBuilder()
                        .followRedirects(HttpClient.Redirect.NORMAL)
                        .build(),
                jsonMapper);
    }

    public OpenAIService(OpenAIProperties properties, HttpClient client, ObjectMapper jsonMapper) {
        this.client = client;
        this.properties = properties;
        this.jsonMapper = jsonMapper;
    }

    private HttpRequest request(String jsonBody) {
        return HttpRequest.newBuilder()
                .uri(properties.getUrl())
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .setHeader("Content-Type", "application/json")
                .setHeader("Authorization", "Bearer " + properties.getApiKey())
                .build();
    }

    private @Language("json") String jsonBody(String systemInput, String userInput) {
        var system = Map.of("role", "system", "content", systemInput);
        var user = Map.of("role", "user", "content", userInput);

        var body = Map.of("model", properties.getModel(), "messages", List.of(system, user));

        try {
            return jsonMapper.writeValueAsString(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String ask(String system, String user) {
        var jsonBody = jsonBody(system, user);
        var request = request(jsonBody);
        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != HttpStatus.OK.value())
                throw new ExternalApiNotAvailableException(
                        "Unable to request open ai API: " + request.uri() + " Reason: " + response.body());

            var json = jsonMapper.readTree(response.body());
            return json.get("choices").get(0).get("message").get("content").asText();
        } catch (IOException | InterruptedException e) {
            throw new ExternalApiNotAvailableException(
                    "Unable to request clip vector. API: " + request.uri() + " Reason: " + e.getMessage());
        }
    }
}
