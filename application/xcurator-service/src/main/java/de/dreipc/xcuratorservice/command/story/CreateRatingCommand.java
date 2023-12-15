package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Rating;
import de.dreipc.xcuratorservice.data.story.RatingRepository;
import de.dreipc.xcuratorservice.data.story.Story;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneId;

@Service
public class CreateRatingCommand {

    private final RatingRepository ratingRepository;
    private final MongoTemplate template;

    public CreateRatingCommand(RatingRepository ratingRepository, MongoTemplate template) {
        this.ratingRepository = ratingRepository;
        this.template = template;
    }

    public Float execute(Float ratingScore, ObjectId storyId, String userId) {
        var timeZone = ZoneId.of("Europe/Berlin");

        var storySelector = new Query(Criteria.where("_id").is(storyId));
        if (!template.exists(storySelector, Story.class))
            throw new NotFoundException("Story (" + storyId + ") not exist.");

        var userRatingSelector = new Query();
        userRatingSelector.addCriteria(Criteria.where("storyId").is(storyId));
        userRatingSelector.addCriteria(Criteria.where("userId").is(userId));
        if (template.exists(userRatingSelector, Rating.class)) {
            var rating = (Rating) ratingRepository.getRatingByStoryIdAndUserId(storyId, userId);
            rating.setRating(ratingScore);
            ratingRepository.save(rating);

            var update = new Update();
            update.set("rating", ratingRepository.getAverageRating(storyId));
            update.set("updatedAt", OffsetDateTime.now(timeZone));
            template.updateFirst(storySelector, update, Story.class);

            return ratingScore;
        }

        var rating = Rating.builder()
                .rating(ratingScore)
                .userId(userId)
                .storyId(storyId)
                .createdAt(OffsetDateTime.now(timeZone))
                .isDeleted(false)
                .build();

        ratingRepository.insert(rating);

        var update = new Update();
        update.set("rating", ratingRepository.getAverageRating(storyId));
        update.set("updatedAt", OffsetDateTime.now(timeZone));
        template.updateFirst(storySelector, update, Story.class);

        return ratingScore;
    }
}
