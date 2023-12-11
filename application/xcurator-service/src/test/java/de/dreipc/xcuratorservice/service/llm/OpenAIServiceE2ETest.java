package de.dreipc.xcuratorservice.service.llm;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@Disabled // please add a valid key
class OpenAIServiceE2ETest {

    private final String OPEN_AI_KEY = "";
    private OpenAIService service;

    @BeforeEach
    void setUp() {
        var properties = new OpenAIProperties();
        properties.setApiKey(OPEN_AI_KEY);
        properties.setModel("gpt-3.5-turbo-16k-0613");

        this.service = new OpenAIService(properties, new ObjectMapper());
    }

    @Test
    void ask() {
        var answer = service.ask(
                "Your are a museums director. Answer in the language: de",
                "What is your most exiting object in the museums archive?");
        assertNotNull(answer);
    }
}
