package de.dreipc.xcuratorservice.config;

import de.dreipc.xcuratorservice.service.CountryService;
import de.dreipc.xcuratorservice.service.JavaCountryService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Locale;

@Configuration
public class BeanConfig {

    @Bean
    public CountryService localeService() {
        return new JavaCountryService(List.of(Locale.GERMAN, Locale.ENGLISH, new Locale("nl")));
    }
}
