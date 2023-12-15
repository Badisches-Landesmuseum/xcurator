package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class LocationAspect implements ArtefactAspect<List<String>> {
    private final ObjectMapper jsonMapper = new ObjectMapper();

    @Override
    public Optional<JsonNode> query(List<String> countryNames) {
        if (countryNames == null || countryNames.isEmpty()) return Optional.empty();

        if (countryNames.size() == 1) {
            var query = toLocationFilter(countryNames.get(0));
            return Optional.of(toJson(query, countryNames));
        }

        var queries = countryNames.stream().map(this::toLocationFilter).toList();
        var joinedQuery = String.join(",", queries);
        // language=json
        var query =
                """
                        {
                          "bool": {
                            "should" : [
                              <COUNTRY_FILTERS>
                            ]
                          }
                        }
                        """
                        .replace("<COUNTRY_FILTERS>", joinedQuery);
        return Optional.of(toJson(query, countryNames));
    }

    private String toLocationFilter(String countryName) {
        // language=json
        return """
                 { "term": { "locations.country.keyword": "<COUNTY_NAME>" } }
                """
                .replace("<COUNTY_NAME>", countryName);
    }

    private JsonNode toJson(String query, List<String> locationNames) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "unable to create location query filter with input (" + String.join(",", locationNames) + ")", e);
        }
    }

    @Override
    public Optional<JsonNode> facette() {
        // language=json
        var aggregate =
                """
                    {
                      "multi_terms": {
                        "terms": [
                          {"field": "locations.continent.keyword"},
                          {"field": "locations.country.keyword"}
                        ]
                      }
                    }
                    """;
        return Optional.of(toJson(aggregate, Collections.emptyList()));
    }

    @Override
    public Optional<JsonNode> boost(List<String> continentNames, float weight) {
        var continentStringList = continentNames.stream()
                .map(String::toUpperCase)
                .map(name -> "\"" + name + "\"")
                .collect(Collectors.joining(","));

        // language=json
        var boostFunction =
                """
                        {
                          "filter": { "terms": {
                            "locations.continent.keyword": [<CONTINENTS>]
                          }}, "weight": <WEIGHT>
                        }
                """
                        .replace("<CONTINENTS>", continentStringList)
                        .replace("<WEIGHT>", String.valueOf(weight));

        return Optional.of(toJson(boostFunction, continentNames));
    }
}
