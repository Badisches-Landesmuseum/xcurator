package de.dreipc.xcuratorservice.testutil;

import com.netflix.graphql.dgs.DgsDataLoader;
import com.netflix.graphql.dgs.DgsDataLoaderOptionsProvider;
import com.netflix.graphql.dgs.internal.DgsDataLoaderProvider;
import org.dataloader.DataLoaderOptions;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.time.Duration;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * This Configuration mainly overrides the dataloader behaviour, to run with disabled batch mode.
 * Doing that, will execute dataloaders in junit tests immediately without calling manual dispatch()
 */
@Configuration
public class GraphQLTestConfiguration implements BeforeAllCallback {

    /**
     * Bean optional used by the dataloaders
     */
    @Bean
    public Executor executor() {
        return Executors.newCachedThreadPool();
    }

    /**
     * Override DataLoaderProvider to force batch mode disabled"
     */
    @Bean
    @Primary
    public DgsDataLoaderProvider dgsDataLoaderProvider(ApplicationContext applicationContext) {
        var optionsProvider = new DgsDataLoaderOptionsProvider() {
            @NotNull
            @Override
            public DataLoaderOptions getOptions(@NotNull String s, @NotNull DgsDataLoader dgsDataLoader) {
                var options = new DataLoaderOptions();
                options.setBatchingEnabled(false);
                options.setCachingEnabled(false);
                return options;
            }
        };
        return new DgsDataLoaderProvider(
                applicationContext,
                optionsProvider,
                Executors.newSingleThreadScheduledExecutor(),
                Duration.ofMillis(10),
                false);
    }

    @Override
    public void beforeAll(ExtensionContext context) {
        System.setProperty("spring.main.allow-bean-definition-overriding", "true");
    }
}
