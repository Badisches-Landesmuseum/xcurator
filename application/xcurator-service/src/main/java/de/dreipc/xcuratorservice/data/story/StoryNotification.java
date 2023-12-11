package de.dreipc.xcuratorservice.data.story;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Getter
@Setter
@Builder
public class StoryNotification {

    @Id
    @Setter(AccessLevel.NONE)
    private String id;

    @NonNull
    private ObjectId storyId;

    @NonNull
    private List<String> senderId;

    private Boolean isRead;

    private Boolean isDeleted;
}
