package de.dreipc.xcuratorservice.data.artefact;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter(value = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class DateRange {
    LocalDate start;
    LocalDate end;
    String literal;
}
