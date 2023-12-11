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

@Service
public class DeleteArtefactFromBasketCommand {

    private final MongoTemplate mongoTemplate;

    public DeleteArtefactFromBasketCommand(MongoTemplate template) {
        this.mongoTemplate = template;
    }

    public Story execute(String storyId, ObjectId artefactId) {
        var query = new Query(Criteria.where("_id").is(storyId));

        if (!mongoTemplate.exists(query, Story.class)) {
            throw new NotFoundException("Story (" + storyId + ") not exist.");
        }

        var update = new Update().pull("artefactBasket", artefactId);

        return mongoTemplate.findAndModify(query, update, new FindAndModifyOptions().returnNew(true), Story.class);
    }
}
