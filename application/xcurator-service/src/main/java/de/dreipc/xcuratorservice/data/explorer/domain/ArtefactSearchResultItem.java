package de.dreipc.xcuratorservice.data.explorer.domain;

import de.dreipc.xcuratorservice.data.artefact.Image;
import lombok.Builder;
import lombok.Singular;
import lombok.Value;

import java.util.List;
import java.util.Locale;
import java.util.Map;

@Value
@Builder
public class ArtefactSearchResultItem {

    String id;
    Map<Locale, String> title;

    @Singular
    List<Image> images;

    Class<?> type;
    float[] embedding;

    float score;
}
