package de.dreipc.xcuratorservice.data.llm;

import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataMongoTest
@EnableTestcontainers(mongo = true)
class LLMTemplateRepositoryE2ETest {

    @Test
    void storeAndRetrieve(@Autowired LLMTemplateRepository repository) {
        var expectedTemplate = LLMTemplate.builder()
                .id(LLM.MODUL_THOUGHT)
                .systemTemplate("Artefact: 123, text: juhuu")
                .userTemplate("what's the text of artefact 123?")
                .build();

        repository.save(expectedTemplate);

        var template = repository.findById(LLM.MODUL_THOUGHT).orElseThrow();
        assertEquals(expectedTemplate, template);
    }

    @Test
    void storeUpdateAndRetrieve(@Autowired LLMTemplateRepository repository) {
        var oldTemplate = LLMTemplate.builder()
                .id(LLM.MODUL_THOUGHT)
                .systemTemplate("Artefact: 123, text: juhuu")
                .userTemplate("what's the text of artefact 123?")
                .build();

        var storedTemplate = repository.save(oldTemplate);

        var nextTemplate = storedTemplate.toBuilder()
                .systemTemplate("Artefact: 259, text: oh noo")
                .userTemplate("what's the text of artefact 259?")
                .build();
        storedTemplate = repository.save(nextTemplate);

        var template = repository.findById(LLM.MODUL_THOUGHT).orElseThrow();
        assertEquals(storedTemplate.getSystemTemplate(), nextTemplate.getSystemTemplate());
        assertEquals(storedTemplate.getUserTemplate(), nextTemplate.getUserTemplate());
        assertEquals(1, template.getVersion());
    }

    @AfterEach
    void tearDown(@Autowired LLMTemplateRepository repository) {
        repository.deleteAll();
    }
}
