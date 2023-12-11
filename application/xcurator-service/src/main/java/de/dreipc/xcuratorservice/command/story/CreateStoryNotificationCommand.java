package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryNotification;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreateStoryNotificationCommand {

    private final MongoTemplate template;

    public CreateStoryNotificationCommand(MongoTemplate template) {
        this.template = template;
    }

    public StoryNotification execute(String userId, ObjectId storyId) {
        var storySelector = new Query(Criteria.where("_id").is(storyId));
        if (!template.exists(storySelector, Story.class)) {
            throw new NotFoundException("Story (" + storyId + ") not exist.");
        }

        var isStoryReportedSelector =
                new Query(Criteria.where("storyId").is(storyId).and("isDeleted").is(false));

        var isStoryNotificationRead =
                new Query(Criteria.where("storyId").is(storyId).and("isRead").is(true));

        if (template.exists(isStoryReportedSelector, StoryNotification.class)
                && !template.exists(isStoryNotificationRead, StoryNotification.class)) {
            var update = new Update().addToSet("senderId", userId);

            return template.findAndModify(
                    isStoryReportedSelector,
                    update,
                    new FindAndModifyOptions().returnNew(true),
                    StoryNotification.class);
        } else {
            var notification = StoryNotification.builder()
                    .senderId(List.of(userId))
                    .storyId(storyId)
                    .isRead(false)
                    .isDeleted(false)
                    .build();

            template.insert(notification);

            return notification;
        }
    }
}
