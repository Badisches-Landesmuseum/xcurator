package de.dreipc.xcuratorservice.data.explorer.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Value
@Builder
public class ArtefactSearchResult {

    List<ArtefactItemResult> items;
    Map<String, Map<String, Integer>> facettes;

    @Getter
    String queryString;

    public Map<ObjectId, float[]> embeddingsByIdentifier() {
        return this.items.stream()
                .collect(Collectors.toMap(ArtefactItemResult::id, ArtefactItemResult::embedding, (i1, i2) -> i1));
    }
}
