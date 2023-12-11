package de.dreipc.xcuratorservice.service;

import java.util.Locale;

public interface CountryService {

    /**
     * Converts a country name in a specific language to a ISO 3166 country code
     *
     * @param countryName, name of a country (Germany)
     * @param language, java.util.Locale representation of a language (new Locale("de") || Locale.Germany )
     * @return iso code of the country (de)
     */
    String isoCode(String countryName, Locale language);

    /**
     * Converts a ISO 3166 country code in a specific language to a country name
     *
     * @param isoCode, ISO 3166 country code (de)
     * @param language, java.util.Locale representation of a language (new Locale("de") || Locale.Germany )
     * @return country name in the specified language
     */
    String countryName(String isoCode, Locale language);
}
