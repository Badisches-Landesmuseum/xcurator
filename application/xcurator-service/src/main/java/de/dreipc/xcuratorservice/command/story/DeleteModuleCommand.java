package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeleteModuleCommand {
    private final MongoTemplate mongoTemplate;

    public DeleteModuleCommand(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Transactional
    public String execute(String storyId, String moduleId) {
        var story = mongoTemplate.findOne(
                new Query(Criteria.where("_id").is(storyId).and("modules._id").is(moduleId)), Story.class);
        if (story == null) throw new NotFoundException("Story with id " + storyId + " not found");

        Integer deletedIndex = story.getModules().stream()
                .filter(module -> module.getId().equals(new ObjectId(moduleId)))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Module with id " + moduleId + " not found"))
                .getIndex();

        var query = new Query(Criteria.where("_id").is(storyId));

        var update =
                new Update().pull("modules", new Query(Criteria.where("_id").is(new ObjectId(moduleId))));

        mongoTemplate.updateFirst(query, update, Story.class);

        updateModuleIndexes(storyId, deletedIndex);

        return moduleId;
    }

    private void updateModuleIndexes(String storyId, int index) {
        var query = new Query(Criteria.where("_id").is(storyId));
        Update update = new Update().inc("modules.$.index", -1);
        query.addCriteria(Criteria.where("modules.index").gte(index));

        mongoTemplate.updateMulti(query, update, Story.class);
    }
}
