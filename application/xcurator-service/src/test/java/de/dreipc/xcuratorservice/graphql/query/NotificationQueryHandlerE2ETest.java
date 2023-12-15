package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.DgsDataLoader;
import com.netflix.graphql.dgs.DgsQueryExecutor;
import de.dreipc.xcuratorservice.GeneratedTestData;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.story.StoryNotificationRepository;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import de.dreipc.xcuratorservice.testutil.GraphQlTest;
import de.dreipc.xcuratorservice.testutil.WithDreipcUser;
import graphql.ExecutionResult;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@GraphQlTest
@DataMongoTest(
        includeFilters = {
            @ComponentScan.Filter(
                    type = FilterType.ASSIGNABLE_TYPE,
                    value = {NotificationQueryHandler.class}),
            @ComponentScan.Filter(
                    type = FilterType.ANNOTATION,
                    classes = {DgsDataLoader.class})
        })
@EnableTestcontainers(mongo = true)
public class NotificationQueryHandlerE2ETest {

    @Autowired
    DgsQueryExecutor dgsExecutor;

    @BeforeEach
    void setUp(
            @Autowired StoryNotificationRepository notificationRepository,
            @Autowired StoryRepository storyRepository,
            @Autowired ArtefactRepository artefactRepository) {
        artefactRepository.insert(GeneratedTestData.ARTEFACTS);
        storyRepository.insert(GeneratedTestData.STORIES);
        notificationRepository.insert(GeneratedTestData.STORY_NOTIFICATION);
    }

    @AfterEach
    void tearDown(
            @Autowired StoryNotificationRepository notificationRepository,
            @Autowired StoryRepository storyRepository,
            @Autowired ArtefactRepository artefactRepository) {
        artefactRepository.deleteAll();
        storyRepository.deleteAll();
        notificationRepository.deleteAll();
    }

    @Test
    @WithDreipcUser(
            roles = {"USER", "ADMIN"},
            id = GeneratedTestData.USER_ID)
    void getNotificationShouldWorkIfUserIsAdmin() {
        List<String> messages = dgsExecutor.executeAndExtractJsonPath(
                "{storyNotifications {id message }}", "data.storyNotifications[*].message");

        assertThat(messages).contains("Story Notification");
    }

    @Test
    @WithDreipcUser(id = GeneratedTestData.USER_ID)
    void getNotificationShouldThrowErrorIfUserIsNotAdmin() {
        ExecutionResult result = dgsExecutor.execute("{storyNotifications {id message }}");
        assertThat(result.getErrors()).isNotEmpty();
        assertThat(result.getErrors().get(0).getMessage()).contains("Permission denied");
    }
}
