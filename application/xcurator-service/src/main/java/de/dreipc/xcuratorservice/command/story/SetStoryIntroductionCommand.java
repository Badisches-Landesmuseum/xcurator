package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import dreipc.common.graphql.exception.NotFoundException;
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

@Service
public class SetStoryIntroductionCommand {
    private final MongoTemplate mongoTemplate;

    public SetStoryIntroductionCommand(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Transactional
    public Story execute(ObjectId storyId, String introduction) {
        var timeZone = ZoneId.of("Europe/Berlin");

        if (!mongoTemplate.exists(new Query(Criteria.where("_id").is(storyId)), Story.class))
            throw new NotFoundException("Story with id (" + storyId + ") not exist.");

        var selector = new Query(Criteria.where("_id").is(storyId));

        var update = new Update();

        if (introduction.isBlank()) introduction = null;
        update.set("introduction", introduction);
        update.set("updatedAt", OffsetDateTime.now(timeZone));

        return mongoTemplate.findAndModify(selector, update, new FindAndModifyOptions().returnNew(true), Story.class);
    }
}
