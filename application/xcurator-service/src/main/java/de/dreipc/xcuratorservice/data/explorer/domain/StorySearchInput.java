package de.dreipc.xcuratorservice.data.explorer.domain;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;

import java.util.Locale;

@Value
@Builder
public class StorySearchInput {

    @NotNull
    String queryString;

    @NotNull
    Locale language;

    @NotNull
    @Builder.Default
    Boolean isPublished = true;

    @Builder.Default
    int maxCount = 10;
}
