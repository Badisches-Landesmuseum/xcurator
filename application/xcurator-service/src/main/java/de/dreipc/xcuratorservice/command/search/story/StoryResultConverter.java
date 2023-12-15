package de.dreipc.xcuratorservice.command.search.story;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import de.dreipc.xcuratorservice.data.explorer.domain.StoryItemResult;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
@SuppressWarnings("json")
public class StoryResultConverter {

    public List<StoryItemResult> execute(JsonNode result) {
        ArrayNode foundStories = (ArrayNode) result.get("hits").get("hits");
        return toStream(foundStories).map(this::toItem).toList();
    }

    private StoryItemResult toItem(JsonNode result) {
        var idString = result.get("_id").asText();
        var id = new ObjectId(idString);
        var score = (float) result.get("_score").asDouble();

        // ToDo: Check if '$oid' is correct
        String artefactId;
        if (result.get("_source").get("modules") != null) {
            artefactId = result.get("_source")
                    .get("modules")
                    .get(0)
                    .get("artefactIds")
                    .get(0)
                    .asText();
            return new StoryItemResult(id, new ObjectId(artefactId), score);
        }

        return new StoryItemResult(id, null, score);
    }

    private Stream<JsonNode> toStream(ArrayNode node) {
        return StreamSupport.stream(node.spliterator(), false);
    }
}
