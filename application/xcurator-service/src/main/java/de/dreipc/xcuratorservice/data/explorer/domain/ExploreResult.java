package de.dreipc.xcuratorservice.data.explorer.domain;

import de.dreipc.xcuratorservice.data.explorer.GridInfo;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExploreResult {
    List<ArtefactSortedSearchResult> items;
    GridInfo gridInfo;
}
