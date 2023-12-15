package de.dreipc.xcuratorservice.config;

import de.pixolution.embeddingsGrid.api.SortApiDelegate;
import de.pixolution.embeddingsGrid.api.SortApiDelegateImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NavinguConfig {

    @Bean
    public SortApiDelegate sortApiDelegate() {
        return new SortApiDelegateImpl();
    }
}
