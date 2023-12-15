package de.dreipc.xcuratorservice.service.llm;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.llm.LLM;
import de.dreipc.xcuratorservice.data.llm.LLMTemplate;
import de.dreipc.xcuratorservice.data.llm.LLMTemplateRepository;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class xCuratorTextGenerator implements TextGenerator {
    private final LLMService llmService;
    private final LLMTemplateRepository repository;

    private final StoryRepository storyRepository;
    private final ArtefactRepository artefactRepository;

    private final ObjectMapper jsonMapper;

    public xCuratorTextGenerator(
            LLMService llmService,
            LLMTemplateRepository repository,
            StoryRepository storyRepository,
            ArtefactRepository artefactRepository,
            ObjectMapper jsonMapper) {
        this.llmService = llmService;
        this.repository = repository;
        this.storyRepository = storyRepository;
        this.artefactRepository = artefactRepository;
        this.jsonMapper = jsonMapper;
        this.jsonMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @Override
    public String generateThought(ObjectId storyId, List<ObjectId> artefactIds, String userInput) {
        var template = repository
                .findById(LLM.MODUL_THOUGHT)
                .orElseThrow(() -> new IllegalArgumentException("No template for artefact qa found."));

        var storyCore = storyRepository.findByIdCore(storyId);
        var language = storyCore.getLanguage().name().toLowerCase();
        var artefacts = artefactRepository.findArtefactByIdProjected(artefactIds, language);

        String dataString = null;
        try {
            dataString = "Artefacts: " + jsonMapper.writeValueAsString(artefacts) + "\n\nStory Info: "
                    + jsonMapper.writeValueAsString(storyCore);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        var system = template.getSystemTemplate()
                .replace(LLMTemplate.dataMarker, dataString)
                .replace(LLMTemplate.languageMarker, language)
                .replace("<USER_INPUT>", userInput);

        var user = template.getUserTemplate()
                .replace(LLMTemplate.dataMarker, dataString)
                .replace(LLMTemplate.languageMarker, language)
                .replace("<USER_INPUT>", userInput);

        return llmService.ask(system, user);
    }

    @Override
    public String generateConclusion(ObjectId storyId) {
        var template = repository
                .findById(LLM.CONCLUSION)
                .orElseThrow(() -> new IllegalArgumentException("No template for artefact qa found."));
        return executeStoryTemplate(storyId, template);
    }

    @Override
    public String generateIntro(ObjectId storyId) {
        var template = repository
                .findById(LLM.INTRODUCTION)
                .orElseThrow(() -> new IllegalArgumentException("No template for artefact qa found."));
        return executeStoryTemplate(storyId, template);
    }

    private String executeStoryTemplate(ObjectId storyId, LLMTemplate template) {
        var language = storyRepository.language(storyId);
        language = language.split(":")[1].substring(2, 4).toLowerCase();
        var storyJson = storyRepository.storyWithArtefacts(storyId, language.toLowerCase());
        if (storyJson == null) throw new NotFoundException("Story (" + storyId.toString() + ") not found.");

        var dataString = storyJson.toJson();

        var system = template.getSystemTemplate()
                .replace(LLMTemplate.dataMarker, dataString)
                .replace(LLMTemplate.languageMarker, language);

        var user = template.getUserTemplate()
                .replace(LLMTemplate.dataMarker, dataString)
                .replace(LLMTemplate.languageMarker, language);

        return llmService.ask(system, user);
    }
}
