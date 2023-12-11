package de.dreipc.xcuratorservice.data.explorer.navigu;

import de.dreipc.xcuratorservice.data.explorer.domain.ExploreItemPin;
import de.dreipc.xcuratorservice.data.explorer.domain.ExploreItemSize;
import lombok.Builder;
import lombok.Value;
import org.bson.types.ObjectId;

@Value
@Builder
public class NaviguItem {

    ObjectId relatedObjectId;
    ExploreItemPin pin;
    ExploreItemSize size;
}
