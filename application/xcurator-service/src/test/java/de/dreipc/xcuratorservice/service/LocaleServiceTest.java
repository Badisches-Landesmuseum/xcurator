package de.dreipc.xcuratorservice.service;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.List;
import java.util.Locale;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class LocaleServiceTest {

    private final JavaCountryService localeService =
            new JavaCountryService(List.of(Locale.GERMAN, Locale.ENGLISH, new Locale("nl")));

    @ParameterizedTest
    @CsvSource({"de, FR, Frankreich", "en, FR, France", "nl, FR, Frankrijk"})
    void germanCountryName(Locale language, String countryCode, String expectedCountryName) {
        assertThat(localeService.countryName(countryCode, language)).isEqualTo(expectedCountryName);
    }

    @ParameterizedTest
    @CsvSource({"de, UNKNOWN_ISO", "en, UNKNOWN_ISO", "nl, UNKNOWN_ISO"})
    void germanCountryName_fail(Locale language, String countryCode) {
        assertThrows(
                IllegalArgumentException.class,
                () -> localeService.countryName(countryCode, language),
                "Unknown iso codes should throw an illegal argument exception, but it didn't");
    }

    @ParameterizedTest
    @CsvSource({"de, Frankreich, FR", "en, France, FR", "nl, Frankrijk, FR"})
    void germanIsoCode(Locale language, String countryName, String expectedIsoCode) {
        assertThat(localeService.isoCode(countryName, language)).isEqualTo(expectedIsoCode);
    }

    @ParameterizedTest
    @CsvSource({"de, UNKNOWN_COUNTRY", "en, UNKNOWN_COUNTRY", "nl, UNKNOWN_COUNTRY"})
    void germanIsoCode_fail(Locale language, String countryName) {
        assertThrows(
                IllegalArgumentException.class,
                () -> localeService.countryName(countryName, language),
                "Unknown country name should throw an illegal argument exception, but it didn't");
    }

    @ParameterizedTest
    @CsvSource({"it"})
    void unsupportedLanguage(Locale unsupportedLanguage) {
        assertThrows(
                IllegalArgumentException.class,
                () -> localeService.countryName("Germany", unsupportedLanguage),
                "Unknown country name should throw an illegal argument exception, but it didn't");

        assertThrows(
                IllegalArgumentException.class,
                () -> localeService.isoCode("DE", unsupportedLanguage),
                "Unknown isoCode should throw an illegal argument exception, but it didn't");
    }
}
