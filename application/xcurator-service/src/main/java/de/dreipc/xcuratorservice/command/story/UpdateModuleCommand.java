package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryTextModule;
import dreipc.common.graphql.exception.NotFoundException;
import dreipc.graphql.types.Language;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class UpdateModuleCommand {
    private final MongoTemplate mongoTemplate;

    public UpdateModuleCommand(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Transactional
    public StoryTextModule execute(
            String storyId, String moduleId, @NonNull Set<ObjectId> artefactIds, String thought, Integer index) {
        var selector = new Query(Criteria.where("modules._id").is(new ObjectId(moduleId)));
        var update = new Update();

        if (!mongoTemplate.exists(selector, Story.class)) {
            throw new NotFoundException("Module with id " + moduleId + " not found");
        }

        if (!artefactIds.isEmpty()) {
            updateArtefactIds(update, artefactIds);
        }

        if (thought != null) {
            updateThought(update, thought);
        }

        if (index != null) {
            updateModuleIndexes(storyId, moduleId, index);
            updateIndex(update, index);
        }

        return mongoTemplate
                .findAndModify(selector, update, new FindAndModifyOptions().returnNew(true), Story.class)
                .getModules()
                .stream()
                .filter(storyTextModule -> storyTextModule.getId().equals(new ObjectId(moduleId)))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Module with id " + moduleId + " not found"));
    }

    private void updateArtefactIds(Update update, Set<ObjectId> artefactIds) {
        update.set("modules.$.artefactIds", artefactIds);
    }

    private void updateThought(Update update, String thought) {
        update.set("modules.$.thought", thought);
    }

    private void updateIndex(Update update, Integer index) {
        update.set("modules.$.index", index);
    }

    private void updateModuleIndexes(String storyId, String moduleId, int newIndex) {
        var query = new Query(Criteria.where("_id").is(storyId));
        Story story = mongoTemplate.findOne(query, Story.class);

        if (story != null && story.getModules() != null) {
            int moduleOldIndex = story.getModules().stream()
                    .filter(module -> module.getId().equals(new ObjectId(moduleId)))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("Module with id " + moduleId + " not found"))
                    .getIndex();

            Update update;
            if (newIndex == 1) {
                update = new Update().inc("modules.$[elem].index", 1);
                update.filterArray(Criteria.where("elem._id")
                        .ne(new ObjectId(moduleId))
                        .and("elem.index")
                        .gte(newIndex)
                        .lt(moduleOldIndex));
            } else if (newIndex > moduleOldIndex) {
                update = new Update().inc("modules.$[elem].index", -1);
                update.filterArray(Criteria.where("elem._id")
                        .ne(new ObjectId(moduleId))
                        .and("elem.index")
                        .gt(moduleOldIndex)
                        .lte(newIndex));
            } else {
                update = new Update().inc("modules.$[elem].index", 1);
                update.filterArray(Criteria.where("elem._id")
                        .ne(new ObjectId(moduleId))
                        .and("elem.index")
                        .gte(newIndex)
                        .lt(moduleOldIndex));
            }

            mongoTemplate.updateMulti(query, update, Story.class);
        }
    }

    public Language getLanguage(String storyId) {
        var story = mongoTemplate.findOne(new Query(Criteria.where("_id").is(storyId)), Story.class);
        if (story == null) throw new NotFoundException("Story with id " + storyId + " not found");

        return story.getLanguage();
    }
}
