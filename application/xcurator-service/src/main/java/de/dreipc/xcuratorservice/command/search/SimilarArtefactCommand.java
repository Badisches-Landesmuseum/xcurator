package de.dreipc.xcuratorservice.command.search;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import de.dreipc.elasticsearch.NativeJsonQuery;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
public class SimilarArtefactCommand {

    private static final String ARTEFACT_INDEX = "xcurator.artefact";
    private final NativeJsonQuery nativeJsonQuery;

    public SimilarArtefactCommand(NativeJsonQuery nativeJsonQuery) {
        this.nativeJsonQuery = nativeJsonQuery;
    }

    public List<ObjectId> execute(ObjectId artefactId, Locale language, int take) throws IOException {
        var query =
                """
                        {
                            "from": 1,
                            "size": <TAKE>,
                            "_source": ["id", "embedding","title.<LANGUAGE>", "images.url"],
                            "query": {
                              "bool": {"must": [
                                {
                                  "elastiknn_nearest_neighbors": {
                                    "field": "embedding",
                                    "vec": {
                                        "index": "xcurator.artefact",
                                        "field": "embedding",
                                        "id": "<ARTEFACT_ID>"
                                    },
                                    "model": "lsh",
                                    "similarity": "cosine",
                                    "candidates": 100
                                 }
                                },
                                {
                                  "exists": {"field": "title.<LANGUAGE>"}
                                }
                              ]}
                            }
                        }
                        """
                        .replace("<TAKE>", String.valueOf(take))
                        .replace("<ARTEFACT_ID>", artefactId.toHexString())
                        .replace("<LANGUAGE>", language.getLanguage());

        var jsonResult = nativeJsonQuery.search(query, ARTEFACT_INDEX);
        var resultHits = jsonResult.get("hits").get("hits");

        if (resultHits instanceof ArrayNode results) {
            return toStream(results)
                    .map(result -> {
                        var id = result.get("_id").asText();
                        return new ObjectId(id);
                    })
                    .toList();
        }
        return new ArrayList<>();
    }

    private Stream<JsonNode> toStream(ArrayNode node) {
        return StreamSupport.stream(node.spliterator(), false);
    }
}
