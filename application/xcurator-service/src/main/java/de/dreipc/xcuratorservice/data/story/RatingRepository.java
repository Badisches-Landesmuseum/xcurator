package de.dreipc.xcuratorservice.data.story;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RatingRepository extends MongoRepository<Rating, ObjectId> {
    @Aggregation(
            pipeline = {"{ $match: { storyId: ?0 } }", "{ $group: { _id: null, avgRating: { $avg: \"$rating\" } } }"})
    Float getAverageRating(ObjectId storyId);

    Rating getRatingByStoryIdAndUserId(ObjectId storyId, String userId);
}
