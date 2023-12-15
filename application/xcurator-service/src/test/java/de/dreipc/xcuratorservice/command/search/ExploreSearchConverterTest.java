package de.dreipc.xcuratorservice.command.search;

import graphql.com.google.common.base.Splitter;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ExploreSearchConverterTest {

    @Test
    void splitLocationInput() {
        var input = "EUROPE|DE";
        var locationParts = Splitter.on('|').splitToList(input);

        assertEquals("EUROPE", locationParts.get(0));
        assertEquals("DE", locationParts.get(1));
    }
}
