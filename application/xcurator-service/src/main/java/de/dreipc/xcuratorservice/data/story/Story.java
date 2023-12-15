package de.dreipc.xcuratorservice.data.story;

import de.dreipc.xcuratorservice.data.explorer.ExploreItem;
import dreipc.graphql.types.Language;
import dreipc.graphql.types.LicenceType;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document
@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class Story implements ExploreItem {
    @Id
    private ObjectId id;

    @NonNull
    @Setter(value = AccessLevel.PUBLIC)
    private String title;

    @NonNull
    @Setter(value = AccessLevel.PUBLIC)
    private Language language;

    private String authorId;

    @Setter(value = AccessLevel.PUBLIC)
    List<ObjectId> artefactBasket;

    @Setter(value = AccessLevel.PUBLIC)
    private List<StoryTextModule> modules;

    @Setter(value = AccessLevel.PUBLIC)
    private List<ObjectId> ratingIds;

    private Float rating;

    // The offsetDateTime conversion to Date (mongo) is handled by 3pc/graphql library
    @CreatedDate
    @Indexed
    @Setter(AccessLevel.NONE)
    @NonNull
    private Instant createdAt;

    // The offsetDateTime conversion to Date (mongo) is handled by 3pc/graphql library
    @LastModifiedDate
    @Indexed
    @Setter(AccessLevel.PUBLIC)
    @NonNull
    private Instant updatedAt;

    @Setter(value = AccessLevel.PUBLIC)
    private Boolean isDeleted;

    @Setter(value = AccessLevel.PUBLIC)
    private Boolean isPublished;

    @Setter(value = AccessLevel.PUBLIC)
    private LicenceType licence;

    private String introduction;
    private String conclusion;
}
