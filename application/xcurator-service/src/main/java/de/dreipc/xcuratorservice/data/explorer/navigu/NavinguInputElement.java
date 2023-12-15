package de.dreipc.xcuratorservice.data.explorer.navigu;

import lombok.Builder;
import lombok.Value;
import org.bson.types.ObjectId;

@Value
@Builder
public class NavinguInputElement {
    ObjectId id;

    @Builder.Default
    int size = 1;

    float[] embedding;
}
