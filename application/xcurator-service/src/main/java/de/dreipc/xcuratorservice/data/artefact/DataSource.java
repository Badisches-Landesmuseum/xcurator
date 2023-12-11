package de.dreipc.xcuratorservice.data.artefact;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

import java.net.URL;

@Builder
@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class DataSource {

    @NonNull
    @Field("id")
    String id;

    @NonNull
    String collection;

    @NonNull
    String owner;

    String language;

    URL url;
}
