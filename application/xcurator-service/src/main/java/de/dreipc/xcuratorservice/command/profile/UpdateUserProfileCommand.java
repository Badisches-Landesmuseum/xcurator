package de.dreipc.xcuratorservice.command.profile;

import de.dreipc.xcuratorservice.data.profile.UserProfile;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class UpdateUserProfileCommand {

    private final MongoTemplate mongoTemplate;

    public UpdateUserProfileCommand(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public UserProfile execute(String userId, UserProfile profile) {
        var selector = new Query(Criteria.where("_id").is(userId));

        Update update = new Update();
        update.set("_id", userId);
        update.set("continents", profile.getContinents());
        update.set("epochs", profile.getEpochs());
        update.set("visitorRole", profile.getVisitorRole());
        update.set("visitorWish", profile.getVisitorWish());
        update.set("visitorTarget", profile.getVisitorTarget());
        update.set("preferredLanguage", profile.getPreferredLanguage());
        if (!profile.getUsername().isEmpty()) update.set("username", profile.getUsername());

        var usingUpsert = new FindAndModifyOptions().upsert(true);

        var storedProfile = mongoTemplate.findAndModify(selector, update, usingUpsert, UserProfile.class);
        return storedProfile == null ? profile : storedProfile;
    }
}
