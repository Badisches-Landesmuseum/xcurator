package de.dreipc.xcuratorservice.data.artefact;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class ArtefactRepositoryImpl implements ArtefactRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public ArtefactRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Map<ObjectId, List<Float>> findAllEmbeddingByIds(Set<ObjectId> artefactIds) {
        var query = new Query();
        query.addCriteria(Criteria.where("_id").in(artefactIds));
        query.fields().include("id", "embedding", "title");
        var artefacts = mongoTemplate.find(query, Artefact.class);

        return artefacts.stream().collect(Collectors.toMap(Artefact::getId, Artefact::getEmbedding));
    }
}
