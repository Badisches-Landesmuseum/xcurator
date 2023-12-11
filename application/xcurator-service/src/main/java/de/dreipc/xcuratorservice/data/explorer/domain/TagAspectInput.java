package de.dreipc.xcuratorservice.data.explorer.domain;

import dreipc.graphql.types.SearchTagInput;
import lombok.Builder;
import lombok.Singular;
import lombok.Value;

import java.util.List;
import java.util.Locale;

@Value
@Builder
public class TagAspectInput {

    @Singular
    List<SearchTagInput> tags;

    Locale language;
}
