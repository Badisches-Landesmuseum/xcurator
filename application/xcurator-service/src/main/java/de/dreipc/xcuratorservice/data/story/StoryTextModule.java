package de.dreipc.xcuratorservice.data.story;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class StoryTextModule {

    @Id
    ObjectId id;

    @NonNull
    @Singular
    Set<ObjectId> artefactIds;

    String thought;

    Integer index;
}
