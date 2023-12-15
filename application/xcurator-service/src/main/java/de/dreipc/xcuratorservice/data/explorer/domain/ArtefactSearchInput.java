package de.dreipc.xcuratorservice.data.explorer.domain;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Singular;
import lombok.Value;

import java.util.List;
import java.util.Locale;

@Value
@Builder
public class ArtefactSearchInput {

    @NotNull
    @Builder.Default
    String queryString = "";

    @NotNull
    Locale language;

    @Singular
    List<String> colors;

    @Singular
    List<String> epochs;

    @Singular
    List<String> owners;

    @NotNull
    @Builder.Default
    TagAspectInput tags = TagAspectInput.builder().build();

    @Singular
    List<String> countries;

    @Singular
    List<String> materials;

    @Singular
    List<String> preferredMaterials;

    @Singular
    List<String> preferredEpochNames;

    @Singular
    List<String> preferredContinents;
}
