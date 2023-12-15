package de.dreipc.xcuratorservice.data.artefact;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document
@Getter
@Setter
@Builder
public class ArtefactNotification {

    @Id
    private ObjectId id;

    @NonNull
    private String artefactId;

    @NonNull
    private String message;

    private Boolean isRead;

    private Boolean isDeleted;

    private Instant createdAt;
}
