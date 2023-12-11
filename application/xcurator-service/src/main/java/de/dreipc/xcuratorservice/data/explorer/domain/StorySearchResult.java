package de.dreipc.xcuratorservice.data.explorer.domain;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class StorySearchResult {

    List<StoryItemResult> items;
}
