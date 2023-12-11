package de.dreipc.xcuratorservice.service.wikipedia;

import dreipc.common.graphql.exception.NotFoundException;
import dreipc.graphql.types.Language;
import org.junit.jupiter.api.Test;

import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;

class WikiPediaAPITest {

    private final WikiPediaAPI wikipedia = new WikiPediaAPI();

    @Test
    void requestQuery() {
        var response =
                wikipedia.requestQuery("Frankreich", Language.DE.toString().toLowerCase());
        assertFalse(response.isEmpty());
    }

    @Test
    void requestUnknownQuery() {
        var unknownId = "Titel der nicht existiert";
        assertThrows(
                NotFoundException.class,
                () -> wikipedia.requestQuery(unknownId, Locale.GERMAN.getLanguage()),
                "requesting an not exiting wikipedia entry should throw a NotFoundException, but it didn't");
    }
}
