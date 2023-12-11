package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class EpochAspect implements ArtefactAspect<List<String>> {

    private final ObjectMapper jsonMapper = new ObjectMapper();
    private final Map<String, String> epochStarts = Map.of(
            "POSTMODERNE", "1945-01-01",
            "MODERNE", "1855-01-01",
            "ROMANTIK", "1770-01-01",
            "BAROCK", "1575-01-01",
            "RENAISSANCE", "1400-01-01",
            "GOTIK", "1200-01-01",
            "ROMANIK", "0950-01-01",
            "FRUEHES_MITTELALTER", "0565-01-01",
            "ANTIKE", "-3000-01-01",
            "UR_UND_FRUEHGESCHICHTE", "-9999-01-01");
    private final Map<String, String> epochEnds = Map.of(
            "POSTMODERNE", "now",
            "MODERNE", "1944-12-31",
            "ROMANTIK", "1854-12-31",
            "BAROCK", "1769-12-31",
            "RENAISSANCE", "1574-12-31",
            "GOTIK", "1399-12-31",
            "ROMANIK", "1199-12-31",
            "FRUEHES_MITTELALTER", "0949-12-31",
            "ANTIKE", "0564-12-31",
            "UR_UND_FRUEHGESCHICHTE", "-3001-12-31");

    @Override
    public Optional<JsonNode> query(List<String> epochNames) {
        if (epochNames.isEmpty()) return Optional.empty();

        if (epochNames.size() == 1) {
            var epochQuery = toDateFilterQuery(epochNames.get(0));
            return Optional.of(toJson(epochQuery, epochNames));
        }

        var dateFilterQueries = epochNames.stream().map(this::toDateFilterQuery).toList();
        var dateFilterJoinedQuery = String.join(",", dateFilterQueries);
        // language=json
        var shouldJoindFilter =
                """
                {
                  "bool": {
                      "should": [
                        <EPOCH_FILTERS>
                      ]
                  }
                }
                """;
        shouldJoindFilter = shouldJoindFilter.replace("<EPOCH_FILTERS>", dateFilterJoinedQuery);
        return Optional.of(toJson(shouldJoindFilter, epochNames));
    }

    private String toDateFilterQuery(String epoch) {
        var startDate = epochStarts.get(epoch);
        var endDate = epochEnds.get(epoch);
        // language=json
        return """
                {
                  "range": {
                    "dateRange.start": {
                      "gte": "<DATE_START>",
                      "lt": "<DATE_END>",
                      "format": "YYYY-MM-dd"
                    }
                  }
                },
                {
                  "range": {
                    "dateRange.end": {
                      "gt": "<DATE_START>",
                      "lte": "<DATE_END>",
                      "format": "YYYY-MM-dd"
                    }
                  }
                }
                    """
                .replace("<DATE_START>", startDate)
                .replace("<DATE_END>", endDate);
    }

    private JsonNode toJson(String query, List<String> epochNames) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "unable to create epoch query with input (" + String.join(",", epochNames) + ")", e);
        }
    }

    // ToDo:
    @Override
    public Optional<JsonNode> facette() {
        // language=json
        var epochFacette =
                """
                   {
                       "date_range": {
                         "field": "dateRange.start",
                         "format": "YYYY-MM-dd",
                         "ranges": [
                           { "from": "1945-01-01", "to": "now", "key": "POSTMODERNE" },
                           { "from": "1855-01-01", "to": "1944-12-31", "key": "MODERNE" },
                           { "from": "1770-01-01", "to": "1854-12-31", "key": "ROMANTIK" },
                           { "from": "1575-01-01", "to": "1769-12-31", "key": "BAROCK" },
                           { "from": "1400-01-01", "to": "1574-12-31", "key": "RENAISSANCE" },
                           { "from": "1200-01-01", "to": "1399-12-31", "key": "GOTIK" },
                           { "from": "0950-01-01", "to": "1199-12-31", "key": "ROMANIK" },
                           { "from": "0565-01-01", "to": "0949-12-31", "key": "FRUEHES_MITTELALTER" },
                           { "from": "-3000-01-01", "to": "0564-12-31", "key": "ANTIKE" },
                           { "from": "-9999-01-01", "to": "-3001-12-31", "key": "UR_UND_FRUEHGESCHICHTE" }
                         ]
                       }
                 }
                """;
        return Optional.of(toJson(epochFacette, Collections.emptyList()));
    }

    @Override
    public Optional<JsonNode> boost(List<String> epochName, float weight) {
        var query = epochName.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toMap(epochStarts::get, epochEnds::get))
                .entrySet()
                .stream()
                .map(epoch ->
                        """
                    {
                      "filter": {
                        "range": {
                          "dateRange.start": {
                            "format": "YYYY-MM-dd",
                            "gte": "<START>",
                            "lte": "<END>"
                          }
                      }}, "weight": <WEIGHT>
                    }
                    """
                                .replace("<START>", epoch.getValue())
                                .replace("<END>", epoch.getKey())
                                .replace("<WEIGHT>", String.valueOf(weight)))
                .collect(Collectors.joining(","));

        return Optional.of(toJson(query, epochName));
    }
}
