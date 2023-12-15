package de.dreipc.xcuratorservice.command.search.artefact;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.command.search.artefact.aspect.*;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSearchInput;
import de.dreipc.xcuratorservice.data.explorer.domain.TagAspectInput;
import de.dreipc.xcuratorservice.data.explorer.domain.TextAspectInput;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@SuppressWarnings("json")
public class ArtefactQueryBuilder {

    private final Map<Class<?>, ArtefactAspect<?>> aspects;
    private final ObjectMapper jsonMapper = new ObjectMapper();

    public ArtefactQueryBuilder(List<ArtefactAspect<?>> artefactAspects) {
        this.aspects = artefactAspects.stream().collect(Collectors.toMap(ArtefactAspect::getClass, elem -> elem));
    }

    public JsonNode buildQuery(ArtefactSearchInput input, int take) {
        var selectorPart = selectorQueryPart(input);
        var filterPart = filterQueryPart(input);
        var facettePart = facetteQueryPart();
        var functionsPart = scoreFunctions(input);

        // language=json
        var stringQuery =
                """
                        {
                          "_source": ["id", "embedding"],
                          "from" : 0,
                          "size" : <TAKE>,
                          "query": {
                            "function_score": {
                              "query": {
                                "bool": {
                                  "must": [
                                   <MUST_QUERY>
                                  ],
                                  "filter" : [
                                   <FILTER_QUERY>
                                  ]
                                }
                              },
                              "functions": [
                                <SCORE_FUNCTIONS>
                              ]
                            }
                          },
                          "aggs" : {
                              <FACETTES>
                          }
                        }
                        """
                        .replace("<TAKE>", String.valueOf(take))
                        .replace("<MUST_QUERY>", selectorPart)
                        .replace("<FILTER_QUERY>", filterPart)
                        .replace("<SCORE_FUNCTIONS>", functionsPart)
                        .replace("<FACETTES>", facettePart);

        return toJson(stringQuery);
    }

    private String scoreFunctions(ArtefactSearchInput input) {
        var functions = new ArrayList<JsonNode>();

        functions.add(decreaseBooksScore(0.05f));

        if (!input.getPreferredContinents().isEmpty())
            aspect(LocationAspect.class)
                    .boost(input.getPreferredContinents(), 10.0f)
                    .ifPresent(functions::add);
        if (!input.getPreferredEpochNames().isEmpty())
            aspect(EpochAspect.class)
                    .boost(input.getPreferredEpochNames(), 10.0f)
                    .ifPresent(functions::add);
        if (!input.getPreferredMaterials().isEmpty())
            aspect(MaterialAspect.class)
                    .boost(input.getPreferredMaterials(), 10.0f)
                    .ifPresent(functions::add);

        return String.join(
                ",\n", functions.stream().map(JsonNode::toPrettyString).toList());
    }

    private JsonNode decreaseBooksScore(float factor) {
        var function =
                """
                               {
                                  "filter": { "term": { "materials.keyword": "book" }},
                                  "weight": <WEIGHT>
                                }
                        """
                        .replace("<WEIGHT>", String.valueOf(factor));
        return toJson(function);
    }

    private String selectorQueryPart(ArtefactSearchInput input) {
        var selectors = new ArrayList<JsonNode>();

        var textInput = new TextAspectInput(input.getQueryString(), input.getLanguage());
        textAspect().query(textInput).ifPresent(selectors::add);

        return String.join(
                ",\n", selectors.stream().map(JsonNode::toPrettyString).toList());
    }

    private String filterQueryPart(ArtefactSearchInput input) {
        var filters = new ArrayList<JsonNode>();

        aspect(OwnerAspect.class).query(input.getOwners()).ifPresent(filters::add);

        aspect(ColorAspect.class).query(input.getColors()).ifPresent(filters::add);

        aspect(LocationAspect.class).query(input.getCountries()).ifPresent(filters::add);

        aspect(EpochAspect.class).query(input.getEpochs()).ifPresent(filters::add);

        aspect(MaterialAspect.class).query(input.getMaterials()).ifPresent(filters::add);

        aspectTag().query(input.getTags()).ifPresent(filters::add);

        return String.join(",\n", filters.stream().map(JsonNode::toPrettyString).toList());
    }

    private String facetteQueryPart() {
        var facettesQueries = facettes().entrySet().stream()
                .map(entry -> String.format(
                        "\"%s\": %s", entry.getKey(), entry.getValue().toPrettyString()))
                .toList();

        return String.join(",\n", facettesQueries);
    }

    private Map<String, JsonNode> facettes() {
        return aspects.values().stream()
                .filter(aspect -> aspect.facette().isPresent())
                .collect(Collectors.toMap(aspect -> aspect.getClass().getSimpleName(), aspect -> aspect.facette()
                        .get()));
    }

    /*****************
     * HELPERS
     *****************/
    private JsonNode toJson(String query) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("unable to create explore query", e);
        }
    }

    @SuppressWarnings("unchecked")
    private ArtefactAspect<TextAspectInput> textAspect() {
        return (ArtefactAspect<TextAspectInput>) aspects.get(TextAspect.class);
    }

    @SuppressWarnings("unchecked")
    private ArtefactAspect<List<String>> aspect(Class<?> implementationClass) {
        return (ArtefactAspect<List<String>>) aspects.get(implementationClass);
    }

    private ArtefactAspect<TagAspectInput> aspectTag() {
        return (ArtefactAspect<TagAspectInput>) aspects.get(TagAspect.class);
    }
}
