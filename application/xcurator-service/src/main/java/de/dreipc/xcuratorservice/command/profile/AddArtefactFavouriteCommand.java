package de.dreipc.xcuratorservice.command.profile;

import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.profile.UserProfile;
import dreipc.common.graphql.exception.BadRequestException;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class AddArtefactFavouriteCommand {

    private final MongoTemplate mongoTemplate;

    public AddArtefactFavouriteCommand(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public ObjectId execute(ObjectId artefactId, String userId) {
        if (!mongoTemplate.exists(new Query(Criteria.where("_id").is(artefactId)), Artefact.class))
            throw new NotFoundException("Artefact with id (" + artefactId + ") not exist.");

        var selector = new Query(Criteria.where("id").is(userId));
        var update = new Update().addToSet("artefactFavorites", artefactId);
        var profile = mongoTemplate.findOne(selector, UserProfile.class);

        if (profile == null || profile.getArtefactFavorites() == null) {
            mongoTemplate.upsert(selector, update, UserProfile.class);
            return artefactId;
        } else if (profile.getArtefactFavorites().contains(artefactId)) {
            throw new BadRequestException("Artefact already in favourites.");
        } else {
            mongoTemplate.findAndModify(selector, update, UserProfile.class);
            return artefactId;
        }
    }
}
