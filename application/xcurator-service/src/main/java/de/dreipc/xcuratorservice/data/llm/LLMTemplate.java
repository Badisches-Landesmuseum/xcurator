package de.dreipc.xcuratorservice.data.llm;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "llmTemplate")
@Value
@Builder(toBuilder = true)
public class LLMTemplate {

    @Id
    LLM id;

    String systemTemplate;
    String userTemplate;

    @Version
    Long version;

    @Transient
    public static String dataMarker = "<DATA>";

    @Transient
    public static String languageMarker = "<LANGUAGE>";

    public boolean noDataInjectionRequired() {
        return systemTemplate.contains(dataMarker) || userTemplate.contains(dataMarker);
    }

    public boolean noLanguageInjectionRequired() {
        return systemTemplate.contains(languageMarker) || userTemplate.contains(languageMarker);
    }
}
