package de.dreipc.xcuratorservice.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.data.llm.LLM;
import de.dreipc.xcuratorservice.data.llm.LLMTemplate;
import de.dreipc.xcuratorservice.data.llm.LLMTemplateRepository;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@Configuration
public class LLMConfig {

    public LLMConfig(LLMTemplateRepository repository, ObjectMapper mapper) throws JsonProcessingException {
        var artefactThoughtJson = getResourceFileAsString("story-modul-thought-prompt.json");
        var artefactThoughtTemplate = mapper.readValue(artefactThoughtJson, LLMTemplate.class);
        if (!repository.existsById(LLM.MODUL_THOUGHT)) repository.save(artefactThoughtTemplate);

        var storyConclusionPromptJson = getResourceFileAsString("story-conclusion-prompt.json");
        var storyConclusionTemplate = mapper.readValue(storyConclusionPromptJson, LLMTemplate.class);
        if (!repository.existsById(LLM.CONCLUSION)) repository.save(storyConclusionTemplate);

        var storyIntroductionPromptJson = getResourceFileAsString("story-introduction-prompt.json");
        var storyIntroductionTemplate = mapper.readValue(storyIntroductionPromptJson, LLMTemplate.class);
        if (!repository.existsById(LLM.INTRODUCTION)) repository.save(storyIntroductionTemplate);
    }

    private static String getResourceFileAsString(String fileName) {
        InputStream is = getResourceFileAsInputStream(fileName);
        if (is != null) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        } else {
            throw new RuntimeException("resource not found");
        }
    }

    private static InputStream getResourceFileAsInputStream(String fileName) {
        ClassLoader classLoader = LLMConfig.class.getClassLoader();
        return classLoader.getResourceAsStream(fileName);
    }
}
