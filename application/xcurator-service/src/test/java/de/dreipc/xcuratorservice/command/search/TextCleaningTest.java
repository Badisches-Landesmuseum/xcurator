package de.dreipc.xcuratorservice.command.search;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TextCleaningTest {

    @ParameterizedTest
    @CsvSource({"\"Schwertlilien mit Schmetterlingen und Libellen\",Schwertlilien mit Schmetterlingen und Libellen"})
    void cleanInput(String input, String expected) {
        var cleaned = input.replaceAll("[\",\']", "");
        assertEquals(expected, cleaned);
    }
}
