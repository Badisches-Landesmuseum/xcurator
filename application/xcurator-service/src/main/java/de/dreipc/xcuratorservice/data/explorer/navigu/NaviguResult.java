package de.dreipc.xcuratorservice.data.explorer.navigu;

import de.dreipc.xcuratorservice.data.explorer.GridInfo;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class NaviguResult {
    List<NaviguItem> items;
    GridInfo gridInfo;
}
