package de.dreipc.xcuratorservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.exception.ExternalApiNotAvailableException;
import de.dreipc.xcuratorservice.service.vector.ClipHttpService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClipHttpServiceTest {

    private final URI FAKE_URI = URI.create("http://clip-http-service:8080/text/embedding");
    private final ObjectMapper JSON_MAPPER = new ObjectMapper();

    @Test
    void convertTextToVector_success(@Mock HttpClient httpClient) {
        mockResponse(httpClient, 200, "[-0.27364, 0.0023]");
        var service = new ClipHttpService(FAKE_URI, JSON_MAPPER, httpClient);

        assertThat(service.toVector("hallo welt")).isNotNull().asList().hasSize(2);
    }

    @Test
    void convertTextToVector_fail(@Mock HttpClient httpClient) {
        mockResponse(httpClient, 502, "{ \"error\": \"Fake Mockito Internal Servicer Error\"}");
        var service = new ClipHttpService(FAKE_URI, JSON_MAPPER, httpClient);

        assertThrows(ExternalApiNotAvailableException.class, () -> service.toVector("hallo welt"));
    }

    /**
     * HELPER
     */
    @SuppressWarnings("unchecked")
    private static void mockResponse(HttpClient client, int statusCode, String body) {
        try {
            var fakeSuccessResponse = (HttpResponse<String>) Mockito.mock(HttpResponse.class);
            when(fakeSuccessResponse.statusCode()).thenReturn(statusCode);
            when(fakeSuccessResponse.body()).thenReturn(body);

            when(client.send(any(HttpRequest.class), eq(HttpResponse.BodyHandlers.ofString())))
                    .thenReturn(fakeSuccessResponse);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
