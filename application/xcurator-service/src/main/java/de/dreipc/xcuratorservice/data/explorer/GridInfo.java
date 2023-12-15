package de.dreipc.xcuratorservice.data.explorer;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GridInfo {

    int columns;
    int rows;
}
