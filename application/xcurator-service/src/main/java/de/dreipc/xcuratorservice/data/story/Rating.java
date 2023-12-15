package de.dreipc.xcuratorservice.data.story;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;

@Document
@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class Rating {

    @Id
    private ObjectId id;

    @NonNull
    private ObjectId storyId;

    @NonNull
    private String userId;

    // min = 1 / max = 5
    @NonNull
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    @Setter(value = AccessLevel.PUBLIC)
    private Float rating;

    @CreatedDate
    @NonNull
    private OffsetDateTime createdAt;

    @Setter(value = AccessLevel.PUBLIC)
    private boolean isDeleted;
}
