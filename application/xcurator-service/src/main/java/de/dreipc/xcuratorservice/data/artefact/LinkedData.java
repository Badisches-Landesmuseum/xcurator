package de.dreipc.xcuratorservice.data.artefact;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

import java.net.URL;

@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class LinkedData {

    @Field("id") // needed to read the value correctly -> seems to be a bug in mongodb
    String id;

    URL url;
}
