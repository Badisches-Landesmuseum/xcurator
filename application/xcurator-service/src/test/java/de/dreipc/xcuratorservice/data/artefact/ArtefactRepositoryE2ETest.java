package de.dreipc.xcuratorservice.data.artefact;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import de.dreipc.xcuratorservice.testutil.xCuratorMongoInitializer;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
@EnableTestcontainers(mongo = true)
class ArtefactRepositoryE2ETest {

    @Autowired
    ArtefactRepository artefactRepository;

    @BeforeAll
    static void setUp(@Autowired MongoTemplate template) throws JsonProcessingException {
        var initalizer = new xCuratorMongoInitializer(template);
        initalizer.insert("xcurator.artefact.json", Artefact.class);
    }

    @Test
    void init(@Autowired MongoTemplate template) {
        var count = template.count(new Query(), Artefact.class);
        assertTrue(count > 0);
    }

    @Test
    void getEmbeddings() {
        var ids = Set.of(new ObjectId("64ef09d73bdeb2f1ef97ba01"));
        var embeddings = artefactRepository.findAllEmbeddingByIds(ids);
        assertNotNull(embeddings);
    }

    @AfterAll
    static void tearDown(@Autowired ArtefactRepository artefactRepository) {
        artefactRepository.deleteAll();
    }
}
