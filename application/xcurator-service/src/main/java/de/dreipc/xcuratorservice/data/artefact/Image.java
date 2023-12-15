package de.dreipc.xcuratorservice.data.artefact;

import lombok.*;

import java.net.URL;

@Getter
@Setter(value = AccessLevel.PACKAGE)
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    URL url;
    Licence licence;
    String photographer;
    int height;
    int width;
}
