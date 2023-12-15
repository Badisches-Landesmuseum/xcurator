package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.dreipc.xcuratorservice.data.explorer.domain.TagAspectInput;
import dreipc.graphql.types.SearchTagInput;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class TagAspect implements ArtefactAspect<TagAspectInput> {
    private final ObjectMapper jsonMapper = new ObjectMapper();

    @Override
    public Optional<JsonNode> query(TagAspectInput input) {
        var tags = input.getTags();
        if (tags == null || tags.isEmpty()) return Optional.empty();

        var persons = new ArrayList<String>();
        var locations = new ArrayList<String>();
        var entities = new ArrayList<String>();
        var keywords = new ArrayList<String>();
        var techniques = new ArrayList<String>();
        var materials = new ArrayList<String>();
        tags.forEach(tag -> {
            switch (tag.getType()) {
                case PERSON -> persons.add(tag.getLiteral());
                case LOCATION -> locations.add(tag.getLiteral());
                case KEYWORD -> keywords.add(tag.getLiteral());
                case TECHNIQUE -> techniques.add(tag.getLiteral());
                case MATERIAL -> materials.add(tag.getLiteral());
                case ENTITY_LOCATION, ENTITY_PERSON, ENTITY_ORGANISATION -> entities.add(tag.getLiteral());
            }
        });

        StringBuilder builder = new StringBuilder();

        var queries = new ArrayList<String>();
        if (!persons.isEmpty()) {
            var personNames = String.join(
                    ",", persons.stream().map(elem -> "\"" + elem + "\"").toList());
            builder.append("{ \"terms\": { \"persons.name.keyword\": [ ");
            builder.append(personNames);
            builder.append(" ] } }");
            queries.add(builder.toString());
            builder = new StringBuilder();
        }

        if (!locations.isEmpty()) {
            var locationNames = String.join(
                    ",", locations.stream().map(elem -> "\"" + elem + "\"").toList());
            builder.append("{ \"terms\": { \"locations.name.keyword\": [ ");
            builder.append(locationNames);
            builder.append(" ] } }");
            queries.add(builder.toString());
            builder = new StringBuilder();
        }

        if (!entities.isEmpty()) {
            var entityNames = String.join(
                    ",", entities.stream().map(elem -> "\"" + elem + "\"").toList());

            builder.append("{ \"terms\": { \"entities.");
            builder.append(input.getLanguage().getLanguage());
            builder.append(".literal.keyword\": [ ");
            builder.append(entityNames);
            builder.append(" ] } }");

            queries.add(builder.toString());
            builder = new StringBuilder();
        }

        if (!materials.isEmpty()) {
            var materialsNames = String.join(
                    ",", materials.stream().map(elem -> "\"" + elem + "\"").toList());
            builder.append("{ \"terms\": { \"materials.keyword\": [ ");
            builder.append(materialsNames);
            builder.append(" ] } }");
            queries.add(builder.toString());
            builder = new StringBuilder();
        }

        if (!techniques.isEmpty()) {
            var techniquesNames = String.join(
                    ",", techniques.stream().map(elem -> "\"" + elem + "\"").toList());
            builder.append("{ \"terms\": { \"techniques.keyword\": [ ");
            builder.append(techniquesNames);
            builder.append(" ] } }");
            queries.add(builder.toString());
            builder = new StringBuilder();
        }

        if (!keywords.isEmpty()) {
            var keywordsNames = String.join(
                    ",", keywords.stream().map(elem -> "\"" + elem + "\"").toList());
            builder.append("{ \"terms\": { \"keywords.keyword\": [ ");
            builder.append(keywordsNames);
            builder.append(" ] } }");
            queries.add(builder.toString());
        }

        var joinedQueries = String.join(",", queries);
        // language=json
        var query =
                """
                        {
                          "bool": {
                            "must" : [
                              <TAG_FILTERS>
                            ]
                          }
                        }
                        """
                        .replace("<TAG_FILTERS>", joinedQueries);
        return Optional.of(toJson(query, tags));
    }

    private JsonNode toJson(String query, List<SearchTagInput> tags) {
        try {
            return jsonMapper.readTree(query);
        } catch (JsonProcessingException e) {
            var tagNames = tags.stream().map(SearchTagInput::getLiteral).toList();
            throw new RuntimeException(
                    "unable to create tag query filter with input (" + String.join(",", tagNames) + ")", e);
        }
    }

    @Override
    public Optional<JsonNode> facette() {
        return Optional.empty();
    }

    @Override
    public Optional<JsonNode> boost(TagAspectInput input, float weight) {
        return Optional.empty();
    }
}
