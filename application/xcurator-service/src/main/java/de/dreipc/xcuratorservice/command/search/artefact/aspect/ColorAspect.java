package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class ColorAspect implements ArtefactAspect<List<String>> {

    private final ObjectMapper jsonMapper = new ObjectMapper();
    private final Map<String, int[]> colorMap = Map.ofEntries(
            Map.entry("RED", new int[] {1, 100, 100}),
            Map.entry("ORANGE", new int[] {39, 100, 100}),
            Map.entry("YELLOW", new int[] {60, 100, 100}),
            Map.entry("GREEN", new int[] {120, 100, 50}),
            Map.entry("TURQUOISE", new int[] {175, 72, 50}),
            Map.entry("BLUE", new int[] {240, 100, 100}),
            Map.entry("PURPLE", new int[] {300, 100, 50}),
            Map.entry("HOTPINK", new int[] {330, 59, 100}),
            Map.entry("SADDLEBROWN", new int[] {30, 70, 26}),
            Map.entry("GRAY", new int[] {1, 1, 60}),
            Map.entry("WHITE", new int[] {1, 1, 100}),
            Map.entry("BLACK", new int[] {1, 1, 20}));

    @Override
    public Optional<JsonNode> query(List<String> colorNames) {
        if (colorNames.isEmpty()) return Optional.empty();

        if (colorNames.size() == 1) {
            var epochQuery = colorFilter(colorNames.get(0));
            return Optional.of(toJson(epochQuery, colorNames));
        }

        var queries = colorNames.stream().map(this::colorFilter).toList();
        var joinedQueries = String.join(",", queries);
        // language=json
        var query =
                """
                        {
                          "bool": {
                              "should": [
                                <COLOR_FILTERS>
                              ]
                          }
                        }
                        """
                        .replace("<COLOR_FILTERS>", joinedQueries);
        return Optional.of(toJson(query, colorNames));
    }

    private String colorFilter(String color) {
        var colorHSV = colorMap.get(color);
        var h = colorHSV[0];
        var s = colorHSV[1];
        var v = colorHSV[2];

        var hHigh = (int) Math.min(Math.max(0, h - h * 0.4), 360);
        var hLow = (int) Math.min(Math.max(0, h + h * 0.4), 360);

        var sHigh = (int) Math.min(Math.max(0, s - s * 0.5), 100);
        var sLow = (int) Math.min(Math.max(0, s + s * 0.5), 100);

        var vHigh = (int) Math.min(Math.max(0, v - v * 0.5), 100);
        var vLow = (int) Math.min(Math.max(0, v + v * 0.5), 100);

        // language=json
        return """
                 {
                  "nested": {
                    "path": "object-color.hsv",
                    "query": {
                      "function_score": {
                        "query": {
                                "bool": {
                                  "must" : [
                                    {
                                      "range" : {
                                        "object-color.hsv.h" : {
                                            "gte": <H_HIGH>,
                                            "lte": <H_LOW>
                                        }
                                      }
                                    },
                                    {
                                      "range" : {
                                        "object-color.hsv.s" : {
                                            "gte": <S_HIGH>,
                                            "lte": <S_LOW>
                                        }
                                      }
                                    },
                                    {
                                      "range" : {
                                        "object-color.hsv.v" : {
                                            "gte": <V_HIGH>,
                                            "lte": <V_LOW>
                                        }
                                      }
                                    }
                                  ]
                                }
                        },
                        "functions": [
                            {
                              "exp": {
                                "object-color.hsv.h" : {
                                  "origin": <H>,
                                  "offset": 1,
                                  "scale": 2
                                }
                              }
                            },
                            {
                              "exp": {
                                "object-color.hsv.s" : {
                                  "origin": <S>,
                                  "offset": 2,
                                  "scale": 4
                                }
                              }
                            },
                            {
                              "exp": {
                                "object-color.hsv.v" : {
                                  "origin": <V>,
                                  "offset": 2,
                                  "scale": 4
                                }
                              }
                            }
                        ]
                      }
                    }
                  }
                }
                          """
                .replace("<H>", String.valueOf(h))
                .replace("<H_HIGH>", String.valueOf(hHigh))
                .replace("<H_LOW>", String.valueOf(hLow))
                .replace("<S>", String.valueOf(s))
                .replace("<S_HIGH>", String.valueOf(sHigh))
                .replace("<S_LOW>", String.valueOf(sLow))
                .replace("<V>", String.valueOf(v))
                .replace("<V_HIGH>", String.valueOf(vHigh))
                .replace("<V_LOW>", String.valueOf(vLow));
    }

    private JsonNode toJson(String query, List<String> colorNames) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "unable to create color query with input (" + String.join(",", colorNames) + ")", e);
        }
    }

    @Override
    public Optional<JsonNode> facette() {
        // language=json
        var colorFacette =
                """
                           {
                              "nested": {
                                "path": "object-color"
                              },
                              "aggs": {
                                "<COLOR_CLASS_NAME>": {
                                  "terms" : {
                                    "field" : "object-color.name",
                                    "min_doc_count": 0
                                  }
                                }
                              }
                            }
                        """
                        .replace("<COLOR_CLASS_NAME>", this.getClass().getSimpleName());
        return Optional.of(toJson(colorFacette, Collections.emptyList()));
    }

    @Override
    public Optional<JsonNode> boost(List<String> input, float weight) {
        return Optional.empty();
    }
}
