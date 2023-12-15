package de.dreipc.xcuratorservice.data.explorer.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;
import lombok.Value;

import java.util.List;
import java.util.Map;

@Value
@Builder
public class ExploreSearchResult {

    @Singular
    List<ExploreItemResult> items;

    @Singular
    Map<String, Map<String, Integer>> facettes;

    @Getter
    String queryString;
}
