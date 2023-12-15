package de.dreipc.xcuratorservice.command.artefact;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.entity.NamedEntityId;
import de.dreipc.xcuratorservice.data.entity.VerifiedNamedEntityRepository;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import de.dreipc.xcuratorservice.testutil.xCuratorMongoInitializer;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Locale;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
@EnableTestcontainers(mongo = true)
class VerifyNamedEntityCommandE2ETest {

    private VerifyNamedEntityCommand command;

    @BeforeAll
    static void setUp(@Autowired MongoTemplate template) throws JsonProcessingException {
        var initalizer = new xCuratorMongoInitializer(template);
        initalizer.insert("xcurator.artefact.json", Artefact.class);
    }

    @BeforeEach
    void init(@Autowired ArtefactRepository artefactRepository, @Autowired VerifiedNamedEntityRepository repository) {
        this.command = new VerifyNamedEntityCommand(repository, artefactRepository);
    }

    @Test
    void verifyEntity_correct(@Autowired VerifiedNamedEntityRepository repository) {
        var language = Locale.GERMAN;
        var entity = new NamedEntityId();
        entity.setArtefactId(new ObjectId("64ef09d73bdeb2f1ef97ba01"));
        entity.setProperty("title");
        entity.setStartPosition(7);
        entity.setEndPosition(15);
        command.execute(entity, language, true);

        assertTrue(repository.existsById(entity));
        assertTrue(repository.findById(entity).get().getIsCorrect());
    }
}
