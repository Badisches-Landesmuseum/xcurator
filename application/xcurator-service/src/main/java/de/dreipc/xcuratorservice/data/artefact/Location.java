package de.dreipc.xcuratorservice.data.artefact;

import lombok.*;

@Getter
@Setter(value = AccessLevel.PACKAGE)
@NoArgsConstructor
public class Location {
    @NonNull
    String name;

    Float longitude;
    Float latitude;

    String countryName;

    String country;
    String continent;
}
