package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import de.dreipc.xcuratorservice.data.llm.LLM;
import de.dreipc.xcuratorservice.data.llm.LLMTemplate;
import de.dreipc.xcuratorservice.data.llm.LLMTemplateRepository;
import de.dreipc.xcuratorservice.service.llm.TextGenerator;
import dreipc.common.graphql.exception.NotFoundException;
import dreipc.graphql.types.StoryConclusionInput;
import dreipc.graphql.types.StoryIntroductionInput;
import dreipc.graphql.types.StoryModuleThoughtInput;
import org.bson.types.ObjectId;

@DgsComponent
public class LLMQueryHandler {

    private final TextGenerator textGenerator;
    private final LLMTemplateRepository repository;

    public LLMQueryHandler(TextGenerator textGenerator, LLMTemplateRepository repository) {
        this.textGenerator = textGenerator;
        this.repository = repository;
    }

    @DgsQuery
    public String generateThought(@InputArgument StoryModuleThoughtInput where) {
        if (!ObjectId.isValid(where.getStoryId()))
            throw new IllegalArgumentException("Given id (" + where.getStoryId() + ") is not valid.");

        where.getArtefactIds().forEach(id -> {
            if (!ObjectId.isValid(id)) throw new IllegalArgumentException("Given id (" + id + ") is not valid.");
        });

        var storyId = new ObjectId(where.getStoryId());
        var artefactIds = where.getArtefactIds().stream().map(ObjectId::new).toList();
        var userInput = where.getUserInput().strip();
        return textGenerator.generateThought(storyId, artefactIds, userInput);
    }

    @DgsQuery
    public String generateIntroduction(@InputArgument StoryIntroductionInput where) {
        if (!ObjectId.isValid(where.getStoryId()))
            throw new IllegalArgumentException("Given id (" + where.getStoryId() + ") is not valid.");

        var storyId = new ObjectId(where.getStoryId());
        return textGenerator.generateIntro(storyId);
    }

    @DgsQuery
    public String generateConclusion(@InputArgument StoryConclusionInput where) {
        if (!ObjectId.isValid(where.getStoryId()))
            throw new IllegalArgumentException("Given id (" + where.getStoryId() + ") is not valid.");

        var storyId = new ObjectId(where.getStoryId());
        return textGenerator.generateConclusion(storyId);
    }

    @DgsQuery
    public LLMTemplate thoughtTemplate() {
        return repository.findById(LLM.MODUL_THOUGHT).orElseThrow(() -> new NotFoundException("Template not found"));
    }

    @DgsQuery
    public LLMTemplate introductionTemplate() {
        return repository.findById(LLM.INTRODUCTION).orElseThrow(() -> new NotFoundException("Template not found"));
    }

    @DgsQuery
    public LLMTemplate conclusionTemplate() {
        return repository.findById(LLM.CONCLUSION).orElseThrow(() -> new NotFoundException("Template not found"));
    }
}
