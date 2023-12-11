package de.dreipc.xcuratorservice.service;

import java.util.*;
import java.util.stream.Collectors;

public class JavaCountryService implements CountryService {

    private final Map<Locale, Map<String, String>> countryIsoByLanguage = new HashMap<>();
    private final List<String> ISO_CODES = Arrays.asList(Locale.getISOCountries());

    public JavaCountryService(List<Locale> languages) {
        languages.forEach(language -> {
            var countryByIso = countryNameToIsoCode(language);
            this.countryIsoByLanguage.put(language, countryByIso);
        });
    }

    private Map<String, String> countryNameToIsoCode(Locale language) {
        return Arrays.stream(Locale.getISOCountries())
                .map(iso -> new Locale(language.getLanguage(), iso))
                .collect(Collectors.toMap(locale -> locale.getDisplayCountry(language), Locale::getCountry));
    }

    @Override
    public String isoCode(String countryName, Locale language) {
        if (!countryIsoByLanguage.containsKey(language))
            throw new IllegalArgumentException("Language (" + language + ") is not supported!");

        var countryToIso = countryIsoByLanguage.get(language);
        if (!countryToIso.containsKey(countryName))
            throw new IllegalArgumentException("Unknown country: " + countryName);

        return countryToIso.get(countryName);
    }

    @Override
    public String countryName(String isoCode, Locale language) {
        if (!countryIsoByLanguage.containsKey(language))
            throw new IllegalArgumentException("Language (" + language + ") is not supported!");
        if (!ISO_CODES.contains(isoCode))
            throw new IllegalArgumentException("Country iso code " + isoCode + " not exist!");
        var locale = new Locale(language.getLanguage(), isoCode);
        return locale.getDisplayCountry(language);
    }
}
