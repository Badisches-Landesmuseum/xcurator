package de.dreipc.xcuratorservice.command.profile;

import de.dreipc.xcuratorservice.data.profile.UserProfile;
import de.dreipc.xcuratorservice.data.profile.UserProfileRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class CreateUserProfileCommand {

    private final MongoTemplate mongoTemplate;
    private final UserProfileRepository repository;

    public CreateUserProfileCommand(MongoTemplate mongoTemplate, UserProfileRepository repository) {
        this.mongoTemplate = mongoTemplate;
        this.repository = repository;
    }

    public UserProfile execute(String userId, String username, Locale preferredLanguage) {
        var selector = new Query(Criteria.where("_id").is(userId));
        if (mongoTemplate.exists(selector, UserProfile.class))
            throw new IllegalArgumentException("Could not create profile. User profile already exists.");

        var profile = UserProfile.builder()
                .id(userId)
                .preferredLanguage(preferredLanguage)
                .username(username)
                .build();
        return repository.insert(profile);
    }
}
