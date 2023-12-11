package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.data.explorer.domain.Material;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class MaterialAspect implements ArtefactAspect<List<String>> {
    private final ObjectMapper jsonMapper = new ObjectMapper();

    @Override
    public Optional<JsonNode> query(List<String> materialNames) {
        if (materialNames == null || materialNames.isEmpty()) return Optional.empty();

        var joinedMaterials = String.join(
                ",", materialNames.stream().map(elem -> "\"" + elem + "\"").toList());
        // language=json
        var query =
                """
                         {
                           "terms": { "materials.keyword": [ <MATERIALS> ] }
                         }
                        """
                        .replace("<MATERIALS>", joinedMaterials);
        return Optional.of(toJson(query, materialNames));
    }

    private JsonNode toJson(String query, List<String> materialNames) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "unable to create material query filter with input (" + String.join(",", materialNames) + ")", e);
        }
    }

    @Override
    public Optional<JsonNode> facette() {
        var materials = Arrays.stream(Material.values()).map(Material::value).toList();
        var includeFilter = String.join("|", materials);

        // language=json
        var aggregate =
                """
                        {
                          "terms": {
                            "field": "materials.keyword",
                            "include": "<MATERIALS>",
                            "min_doc_count" : 0
                          }
                        }
                        """
                        .replace("<MATERIALS>", includeFilter);
        return Optional.of(toJson(aggregate, Collections.emptyList()));
    }

    @Override
    public Optional<JsonNode> boost(List<String> materialNames, float weight) {
        var materialStringList = materialNames.stream()
                .map(String::toUpperCase)
                .map(name -> "\"" + name + "\"")
                .collect(Collectors.joining(","));

        // language=json
        var boostFunction =
                """
                {
                  "filter": {
                     "terms": {
                       "materials.keyword": [<MATERIALS>]
                     }
                  }, "weight": <WEIGHT>
                }
                """
                        .replace("<MATERIALS>", materialStringList)
                        .replace("<WEIGHT>", String.valueOf(weight));

        return Optional.of(toJson(boostFunction, materialNames));
    }
}
