package de.dreipc.xcuratorservice;

import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataMongoTest
@EnableTestcontainers(mongo = true)
public class ExampleE2ETest {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    StoryRepository repository;

    @Test
    void init() {
        var query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        assertEquals(0, repository.count());

        assertEquals(0, mongoTemplate.count(query, Artefact.class));
    }
}
