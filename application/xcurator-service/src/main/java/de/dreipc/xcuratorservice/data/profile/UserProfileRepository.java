package de.dreipc.xcuratorservice.data.profile;

import com.mongodb.BasicDBObject;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserProfileRepository extends MongoRepository<UserProfile, String> {

    // ToDo: add notifications
    @Aggregation({
        "{ '$match':  { '_id':  ?0}}",
        "{'$lookup': {" + "'from': 'story',"
                + "'localField': '_id',"
                + "'foreignField': 'authorId',"
                + "'as': 'storys'}}",
        "{'$lookup': {" + "'from': 'rating',"
                + "'localField': '_id',"
                + "'foreignField': 'userId',"
                + "'as': 'storyRatings'}}",
    })
    BasicDBObject findUserDataById(String userId);

    @Aggregation({
        "{ '$match':  { 'username':  ?0}}",
        "{'$lookup': {" + "'from': 'story',"
                + "'localField': '_id',"
                + "'foreignField': 'authorId',"
                + "'as': 'storys'}}",
        "{'$lookup': {" + "'from': 'rating',"
                + "'localField': '_id',"
                + "'foreignField': 'userId',"
                + "'as': 'storyRatings'}}",
    })
    BasicDBObject findUserDataByUsername(String username);
}
