package de.dreipc.xcuratorservice.command.profile;

import de.dreipc.xcuratorservice.data.profile.UserProfile;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class DeleteArtefactFavouriteCommand {

    private final MongoTemplate mongoTemplate;

    public DeleteArtefactFavouriteCommand(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void execute(ObjectId artefactId, String userId) {
        var query = new Query(Criteria.where("_id").is(userId));
        var update = new Update().pull("artefactFavorites", artefactId);

        mongoTemplate.findAndModify(query, update, UserProfile.class);
    }
}
