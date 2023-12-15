package de.dreipc.xcuratorservice.graphql.query;

import de.dreipc.xcuratorservice.service.wikidata.WikiData;
import de.dreipc.xcuratorservice.service.wikipedia.WikiPedia;
import dreipc.graphql.types.Language;
import dreipc.graphql.types.NamedEntityDetailInput;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NamedEntityQueryHandlerTest {

    NamedEntityQueryHandler fetcher = new NamedEntityQueryHandler(new WikiData(), new WikiPedia());

    @Test
    void entitiesDetail() {

        var data = NamedEntityDetailInput.newBuilder()
                .language(Language.DE)
                .wikidataId("Q1405")
                .wikipediaId("Augustus")
                .build();

        var result = fetcher.entitiesDetail(data);
        assertNotNull(result);
    }
}
