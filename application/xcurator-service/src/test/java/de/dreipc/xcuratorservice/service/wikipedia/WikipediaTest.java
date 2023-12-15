package de.dreipc.xcuratorservice.service.wikipedia;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class WikipediaTest {

    private WikiPedia wikiPedia = new WikiPedia();

    @ParameterizedTest
    @CsvSource({"Moneyness, de"})
    void fetchEntry(String wikipediaId, String language) {
        var entity = wikiPedia.entity(wikipediaId, language);
        assertNotNull(entity);
        assertEquals(wikipediaId, entity.getId());
        assertNotNull(entity.getDescription());
    }
}
