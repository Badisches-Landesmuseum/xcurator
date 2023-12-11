package de.dreipc.xcuratorservice.data.explorer.domain;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ArtefactSortedSearchResult {

    ArtefactSearchResultItem result;
    ExploreItemPin pin;
    ExploreItemSize size;
}
