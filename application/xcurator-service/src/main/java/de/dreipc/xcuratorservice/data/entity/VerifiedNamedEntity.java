package de.dreipc.xcuratorservice.data.entity;

import lombok.Builder;
import lombok.NonNull;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Value
@Builder
public class VerifiedNamedEntity {

    @Id
    NamedEntityId id;

    @NonNull
    String literal;

    @NonNull
    String linkId;

    @NonNull
    String type;

    @NonNull
    Boolean isCorrect;
}
