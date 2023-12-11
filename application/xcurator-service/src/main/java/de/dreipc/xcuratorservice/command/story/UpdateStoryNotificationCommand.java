package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.StoryNotification;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class UpdateStoryNotificationCommand {

    private final MongoTemplate template;

    public UpdateStoryNotificationCommand(MongoTemplate template) {
        this.template = template;
    }

    public StoryNotification execute(ObjectId notificationId, Boolean isRead) {
        var notificationSelector = new Query(Criteria.where("_id").is(notificationId));

        if (!template.exists(notificationSelector, StoryNotification.class))
            throw new NotFoundException("Notification (" + notificationId + ") not exist.");

        var Update = new Update();

        Update.set("isRead", isRead);

        return template.findAndModify(
                notificationSelector, Update, new FindAndModifyOptions().returnNew(true), StoryNotification.class);
    }
}
