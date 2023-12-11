package de.dreipc.xcuratorservice.service.llm;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.net.URI;

@Getter
@Setter(value = AccessLevel.PACKAGE)
@Configuration
@ConfigurationProperties(prefix = "openai")
public class OpenAIProperties {

    private URI url = URI.create("https://api.openai.com/v1/chat/completions");
    private String apiKey;
    private String model;
}
