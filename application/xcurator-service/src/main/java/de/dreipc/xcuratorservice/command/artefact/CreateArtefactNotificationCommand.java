package de.dreipc.xcuratorservice.command.artefact;

import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactNotification;
import dreipc.common.graphql.exception.NotFoundException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class CreateArtefactNotificationCommand {

    private final MongoTemplate template;

    public CreateArtefactNotificationCommand(MongoTemplate template) {
        this.template = template;
    }

    public ArtefactNotification execute(String artefactId, String message) {
        Query selector = new Query(Criteria.where("_id").is(artefactId));

        if (!template.exists(selector, Artefact.class))
            throw new NotFoundException("Artefact (" + artefactId + ") not exist.");

        ArtefactNotification notification = ArtefactNotification.builder()
                .artefactId(artefactId)
                .message(message)
                .isRead(false)
                .isDeleted(false)
                .createdAt(Instant.now())
                .build();

        template.insert(notification);

        return notification;
    }
}
