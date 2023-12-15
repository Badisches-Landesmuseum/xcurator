package de.dreipc.xcuratorservice.data.artefact;

import lombok.*;

@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class Person {
    @NonNull
    String name;
}
