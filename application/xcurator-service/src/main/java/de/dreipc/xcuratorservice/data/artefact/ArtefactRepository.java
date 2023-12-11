package de.dreipc.xcuratorservice.data.artefact;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ArtefactRepository extends MongoRepository<Artefact, ObjectId>, ArtefactRepositoryCustom {

    @Aggregation(
            pipeline = {
                "{'$match': {'_id': {$in:  [?0] }}}",
                "{'$project': {"
                        + "'title.?1': 1,"
                        + "'description.?1': 1,"
                        + "'locations.name': 1,"
                        + "'persons.name': 1,"
                        + "'materials': 1,"
                        + "'techniques': 1,"
                        + "'keywords': 1,"
                        + "'dateRange.literal': 1}}"
            })
    List<Artefact> findArtefactByIdProjected(Iterable<ObjectId> id, String language);
}
