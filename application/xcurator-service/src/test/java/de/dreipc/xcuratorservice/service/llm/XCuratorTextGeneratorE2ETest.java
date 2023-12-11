package de.dreipc.xcuratorservice.service.llm;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.config.LLMConfig;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.llm.LLMTemplateRepository;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import de.dreipc.xcuratorservice.testutil.xCuratorMongoInitializer;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

@DataMongoTest
@EnableTestcontainers(mongo = true)
class XCuratorTextGeneratorE2ETest {

    private TextGenerator generator;

    @BeforeEach
    void setUp(
            @Autowired MongoTemplate template,
            @Autowired StoryRepository repository,
            @Autowired ArtefactRepository artefactRepository,
            @Autowired LLMTemplateRepository templateRepository)
            throws JsonProcessingException {
        var initalizer = new xCuratorMongoInitializer(template);
        initalizer.insert("xcurator.artefact.json", Artefact.class);
        initalizer.insert("xcurator.story.json", Story.class);

        // init
        new LLMConfig(templateRepository, new ObjectMapper());

        LLMService service = Mockito.mock(LLMService.class);
        this.generator = new xCuratorTextGenerator(
                service, templateRepository, repository, artefactRepository, new ObjectMapper());
    }

    @AfterEach
    void tearDown(@Autowired LLMTemplateRepository templateRepository) {
        templateRepository.deleteAll();
    }

    @Test
    void generateThought() {
        var storyId = new ObjectId("65267c44074b1c6b907b1099");
        var artefactIds = List.of(new ObjectId("64ef09d73bdeb2f1ef97ba04"));
        var userInput = "";

        generator.generateThought(storyId, artefactIds, userInput);
    }

    @Test
    void generateConclusion() {
        var storyId = new ObjectId("65267c44074b1c6b907b1099");

        generator.generateConclusion(storyId);
    }

    @Test
    void generateIntro() {
        var storyId = new ObjectId("65267c44074b1c6b907b1099");

        generator.generateIntro(storyId);
    }
}
