package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import dreipc.common.graphql.exception.NotFoundException;
import dreipc.graphql.types.LicenceType;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class UpdateStoryCommand {
    private final MongoTemplate mongoTemplate;

    public UpdateStoryCommand(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Transactional
    public Story execute(ObjectId storyId, String title, List<String> artefactIds, LicenceType licenceType) {
        var timeZone = ZoneId.of("Europe/Berlin");

        if (!mongoTemplate.exists(new Query(Criteria.where("_id").is(storyId)), Story.class))
            throw new NotFoundException("Story with id (" + storyId + ") not exist.");

        var selector = new Query(Criteria.where("_id").is(storyId));

        var update = new Update();

        if (title != null) update.set("title", title);
        if (artefactIds != null) update.push("artefactBasket").each(artefactIds);
        if (licenceType != null) update.set("licence", licenceType);
        update.set("updatedAt", OffsetDateTime.now(timeZone));

        return mongoTemplate.findAndModify(selector, update, new FindAndModifyOptions().returnNew(true), Story.class);
    }
}
