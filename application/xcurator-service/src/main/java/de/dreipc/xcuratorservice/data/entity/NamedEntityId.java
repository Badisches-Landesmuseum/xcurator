package de.dreipc.xcuratorservice.data.entity;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@NoArgsConstructor
@EqualsAndHashCode
public class NamedEntityId {

    ObjectId artefactId;
    int startPosition;
    int endPosition;
    String property;

    @Builder(toBuilder = true)
    public NamedEntityId(ObjectId artefactId, int startPosition, int endPosition, String property) {
        this.artefactId = artefactId;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.property = property;
    }
}
