package de.dreipc.xcuratorservice.command.profile;

import de.dreipc.xcuratorservice.data.profile.UserProfile;
import de.dreipc.xcuratorservice.data.story.Rating;
import de.dreipc.xcuratorservice.data.story.RatingRepository;
import de.dreipc.xcuratorservice.data.story.Story;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class DeleteUserProfileCommand {

    private final MongoTemplate mongoTemplate;
    private final RatingRepository ratingRepository;

    public DeleteUserProfileCommand(MongoTemplate mongoTemplate, RatingRepository ratingRepository) {
        this.mongoTemplate = mongoTemplate;
        this.ratingRepository = ratingRepository;
    }

    public String execute(String userId) {
        var selector = new Query(Criteria.where("_id").is(userId));
        if (!mongoTemplate.exists(selector, UserProfile.class))
            throw new IllegalArgumentException("Could not delete profile. User profile does not exist.");

        mongoTemplate.findAndRemove(selector, UserProfile.class);

        deleteUserStoriesAndRatings(userId);

        return "Profile with id " + userId + " deleted.";
    }

    @Async
    public void deleteUserStoriesAndRatings(String userId) {
        var storySelector = new Query(Criteria.where("authorId").is(userId));
        var ratingSelector = new Query(Criteria.where("userId").is(userId));

        mongoTemplate.findAllAndRemove(storySelector, Story.class);
        mongoTemplate.findAllAndRemove(ratingSelector, Rating.class);

        var stories = mongoTemplate.findAll(Story.class);

        for (Story story : stories) {
            var update = new Update();
            update.set("rating", ratingRepository.getAverageRating(story.getId()));
            mongoTemplate.updateFirst(new Query(Criteria.where("_id").is(story.getId())), update, Story.class);
        }
    }
}
