package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.StoryNotification;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class DeleteStoryNotificationCommand {

    private final MongoTemplate template;

    public DeleteStoryNotificationCommand(MongoTemplate template) {
        this.template = template;
    }

    public String execute(ObjectId notificationId) {
        var notificationSelector = new Query(Criteria.where("_id").is(notificationId));

        var update = new Update();

        update.set("isDeleted", true);

        template.updateFirst(notificationSelector, update, StoryNotification.class);

        return "notification with id " + notificationId + " is deleted";
    }
}
