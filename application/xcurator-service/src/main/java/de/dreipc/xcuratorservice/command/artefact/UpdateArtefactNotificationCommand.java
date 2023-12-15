package de.dreipc.xcuratorservice.command.artefact;

import de.dreipc.xcuratorservice.data.artefact.ArtefactNotification;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class UpdateArtefactNotificationCommand {

    private final MongoTemplate template;

    public UpdateArtefactNotificationCommand(MongoTemplate template) {
        this.template = template;
    }

    public ArtefactNotification execute(ObjectId notificationId, Boolean isRead) {
        var notificationSelector = new Query(Criteria.where("_id").is(notificationId));

        if (!template.exists(notificationSelector, ArtefactNotification.class))
            throw new NotFoundException("Notification (" + notificationId + ") not exist.");

        var Update = new Update();

        Update.set("isRead", isRead);

        return template.findAndModify(
                notificationSelector, Update, new FindAndModifyOptions().returnNew(true), ArtefactNotification.class);
    }
}
