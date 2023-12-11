package de.dreipc.xcuratorservice.data.artefact;

import de.dreipc.xcuratorservice.data.explorer.ExploreItem;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document
@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
@CompoundIndexes({@CompoundIndex(name = "artefact_sourceInfo", def = "{ 'sourceInfo.id': 1 }", unique = true)})
public class Artefact implements ExploreItem {

    @Id
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NonNull
    @Builder.Default
    Map<Locale, String> title = new HashMap<>();

    @Builder.Default
    Map<Locale, String> description = new HashMap<>();

    // This should be List<Image>
    @Singular
    List<Image> images;

    @Singular
    List<String> keywords;

    @Singular
    List<String> materials;

    @Singular
    List<String> techniques;

    @Singular
    List<Location> locations;

    @Singular
    List<Person> persons;

    DateRange dateRange;

    DataSource sourceInfo;

    @Builder.Default
    List<Float> embedding = new ArrayList<>();

    @Singular
    Map<Locale, List<NamedEntity>> entities;
}
