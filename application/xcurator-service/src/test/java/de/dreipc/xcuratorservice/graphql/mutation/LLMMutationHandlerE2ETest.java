package de.dreipc.xcuratorservice.graphql.mutation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.netflix.graphql.dgs.DgsQueryExecutor;
import de.dreipc.xcuratorservice.GeneratedTestData;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import de.dreipc.xcuratorservice.testutil.WithDreipcUser;
import de.dreipc.xcuratorservice.testutil.xCuratorMongoInitializer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@EnableTestcontainers(mongo = true)
class LLMMutationHandlerE2ETest {

    @Autowired
    DgsQueryExecutor dgsExecutor;

    @BeforeAll
    static void setUp(@Autowired MongoTemplate mongoTemplate) throws JsonProcessingException {
        var initalizer = new xCuratorMongoInitializer(mongoTemplate);
        initalizer.insert("xcurator.artefact.json", Artefact.class);
        initalizer.insert("xcurator.story.json", Story.class);
    }

    @AfterAll
    static void tearDown(@Autowired ArtefactRepository artefactRepository, @Autowired StoryRepository storyRepository) {
        artefactRepository.deleteAll();
        storyRepository.deleteAll();
    }

    @Test
    @WithDreipcUser(
            roles = {"USER", "ADMIN"},
            id = GeneratedTestData.USER_ID)
    void getNotificationShouldWorkIfUserIsAdmin() {
        // language=graphql
        var query = "{ generateConclusion(where: {storyId: \"65267c44074b1c6b907b1099\"})}";
        List<String> messages = dgsExecutor.executeAndExtractJsonPath(query, "data.generateConclusion");

        assertThat(messages).contains("Story Notification");
    }

    void generateInto() {}
}
