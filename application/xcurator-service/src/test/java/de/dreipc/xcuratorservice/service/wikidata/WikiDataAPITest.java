package de.dreipc.xcuratorservice.service.wikidata;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * Wikidata Query Service
 * <a href="https://query.wikidata.org/">Query Endpoint</a>
 */
class WikiDataAPITest {

    private final WikiDataAPI wikidata = new WikiDataAPI();

    @Test
    void requestQuery() {
        String query =
                """
                SELECT ?title ?description ?image ?article
                WHERE
                {
                  VALUES ?entity { wd:Q142 }

                  ?entity rdfs:label ?title.
                  FILTER(lang(?title) = "de")

                  ?entity schema:description ?description.
                  FILTER(lang(?description) = "de")
                  ?entity wdt:P18 ?image.

                OPTIONAL {
                    ?article schema:about ?entity .
                    ?article schema:inLanguage "de" .
                    FILTER (SUBSTR(str(?article), 1, 25) = "https://de.wikipedia.org/")
                    }
                }
                LIMIT 1

                            """;
        var response = wikidata.requestQuery(query);
        assertFalse(response.isEmpty());
    }
}
