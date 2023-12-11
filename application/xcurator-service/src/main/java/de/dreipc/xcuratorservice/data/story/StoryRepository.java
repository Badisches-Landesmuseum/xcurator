package de.dreipc.xcuratorservice.data.story;

import com.mongodb.BasicDBObject;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface StoryRepository extends MongoRepository<Story, ObjectId> {

    @NotNull
    @Override
    @Query("{isDeleted:  false, isPublished:  true}")
    List<Story> findAll(@NotNull Sort sort);

    @Query("{authorId : ?0, isDeleted:  false}")
    List<Story> getStoriesByAuthor(String author);

    @Query(value = "{ _id:  ?0 }", fields = "{language : 1, _id:  0}")
    String language(ObjectId id);

    @Aggregation(
            pipeline = {
                "{'$match': {'_id':?0}}",
                "{'$unwind': {'path': '$modules' }}",
                "{'$match': {'modules._id':?1}}",
                "{'$lookup': {" + "'from': 'artefact',"
                        + "'localField': 'modules.artefactIds',"
                        + "'foreignField': '_id',"
                        + "'as': 'artefacts'}}",
                "    {'$project': {" + "'title': 1,"
                        + "'language': 1,"
                        + "'modules._id': 1,"
                        + "'modules.index': 1,"
                        + "'modules.thought': 1,"
                        + "'artefacts._id': 1,"
                        + "'artefacts.title.?2': 1,"
                        + "'artefacts.description.?2': 1,"
                        + "'artefacts.locations.name': 1,"
                        + "'artefacts.persons.name': 1,"
                        + "'artefacts.materials': 1,"
                        + "'artefacts.techniques': 1,"
                        + "'artefacts.dateRange.literal': 1}}"
            })
    BasicDBObject moduleWithArtefacts(ObjectId storyId, ObjectId moduleId, String language);

    @Aggregation(
            pipeline = {
                "{'$match': {'_id':?0}}",
                "{'$lookup': {" + "'from': 'artefact',"
                        + "'localField': 'modules.artefactIds',"
                        + "'foreignField': '_id',"
                        + "'as': 'artefacts'}}",
                "    {'$project': {" + "'title': 1,"
                        + "'language': 1,"
                        + "'modules._id': 1,"
                        + "'modules.index': 1,"
                        + "'modules.thought': 1,"
                        + "'artefacts._id': 1,"
                        + "'artefacts.title.?1': 1,"
                        + "'artefacts.description.?1': 1,"
                        + "'artefacts.locations.name': 1,"
                        + "'artefacts.persons.name': 1,"
                        + "'artefacts.materials': 1,"
                        + "'artefacts.techniques': 1,"
                        + "'artefacts.dateRange.literal': 1}}"
            })
    BasicDBObject storyWithArtefacts(ObjectId storyId, String language);

    @Query(value = "{ _id:  ?0 }", fields = "{title: 1, language : 1, _id:  0, introduction:  1, conclusion:  1}")
    Story findByIdCore(ObjectId id);
}
