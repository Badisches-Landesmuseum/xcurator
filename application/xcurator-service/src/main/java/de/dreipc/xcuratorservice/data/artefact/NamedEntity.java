package de.dreipc.xcuratorservice.data.artefact;

import lombok.*;

import java.util.Map;

@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class NamedEntity {

    @NonNull
    String property;

    @NonNull
    String type;

    @NonNull
    String literal;

    @NonNull
    Integer startPosition;

    @NonNull
    Integer endPosition;

    @Singular
    Map<String, LinkedData> linkedData;
}
