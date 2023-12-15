package de.dreipc.xcuratorservice.data.profile;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Locale;

@Document
@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class UserProfile {
    @Id
    String id;

    String username;

    Locale preferredLanguage;

    @Singular
    List<ObjectId> artefactFavorites;

    @Singular
    List<Continent> continents;

    @Singular
    List<ProfileEpoch> epochs;

    @Singular
    List<ProfileMaterial> materials;

    VisitorRole visitorRole;

    VisitorWish visitorWish;

    VisitorTarget visitorTarget;
}
