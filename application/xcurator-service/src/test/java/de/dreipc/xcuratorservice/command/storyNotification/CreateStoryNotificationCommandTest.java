package de.dreipc.xcuratorservice.command.storyNotification;

import com.netflix.graphql.dgs.DgsQueryExecutor;
import de.dreipc.xcuratorservice.GeneratedTestData;
import de.dreipc.xcuratorservice.command.story.CreateStoryNotificationCommand;
import de.dreipc.xcuratorservice.testutil.GraphQlTest;
import graphql.ExecutionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.Mockito.doReturn;

@GraphQlTest
public class CreateStoryNotificationCommandTest {

    @MockBean
    CreateStoryNotificationCommand mockCreateStoryNotificationCommand;

    @Autowired
    DgsQueryExecutor dgsExecutor;

    // NOTE: was soll hier sein
    @Test
    public void createStoryNotificationTest() {
        doReturn(GeneratedTestData.STORY_NOTIFICATION)
                .when(mockCreateStoryNotificationCommand)
                .execute(
                        GeneratedTestData.USER_ID,
                        GeneratedTestData.STORIES.get(0).getId());

        ExecutionResult result = dgsExecutor.execute("mutation createStoryNotification {id}");
    }
}
