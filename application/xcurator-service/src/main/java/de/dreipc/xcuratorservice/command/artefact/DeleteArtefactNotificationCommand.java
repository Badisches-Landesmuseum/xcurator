package de.dreipc.xcuratorservice.command.artefact;

import de.dreipc.xcuratorservice.data.artefact.ArtefactNotification;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class DeleteArtefactNotificationCommand {

    private final MongoTemplate template;

    public DeleteArtefactNotificationCommand(MongoTemplate template) {
        this.template = template;
    }

    public String execute(ObjectId notificationId) {
        var notificationSelector = new Query(Criteria.where("_id").is(notificationId));

        var update = new Update();

        update.set("isDeleted", true);

        template.updateFirst(notificationSelector, update, ArtefactNotification.class);

        return "notification with id " + notificationId + " is deleted";
    }
}
