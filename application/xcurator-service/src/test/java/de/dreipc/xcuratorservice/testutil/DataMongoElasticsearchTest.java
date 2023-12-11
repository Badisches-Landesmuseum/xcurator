package de.dreipc.xcuratorservice.testutil;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.autoconfigure.OverrideAutoConfiguration;
import org.springframework.boot.test.autoconfigure.core.AutoConfigureCache;
import org.springframework.boot.test.autoconfigure.data.elasticsearch.AutoConfigureDataElasticsearch;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.annotation.AliasFor;
import org.springframework.core.env.Environment;
import org.springframework.test.context.BootstrapWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@BootstrapWith(DataMongoElasticsearchTestContextBootstrapper.class)
@ExtendWith(SpringExtension.class)
@OverrideAutoConfiguration(enabled = false)
@AutoConfigureCache
@AutoConfigureDataMongo
@ImportAutoConfiguration
@AutoConfigureDataElasticsearch
public @interface DataMongoElasticsearchTest {
    /**
     * Properties in form {@literal key=value} that should be added to the Spring
     * {@link Environment} before the test runs.
     * @return the properties to add
     * @since 2.1.0
     */
    String[] properties() default {};

    /**
     * Determines if default filtering should be used with
     * {@link SpringBootApplication @SpringBootApplication}. By default no beans are
     * included.
     * @see #includeFilters()
     * @see #excludeFilters()
     * @return if default filters should be used
     */
    boolean useDefaultFilters() default true;

    /**
     * A set of include filters which can be used to add otherwise filtered beans to the
     * application context.
     * @return include filters to apply
     */
    ComponentScan.Filter[] includeFilters() default {};

    /**
     * A set of exclude filters which can be used to filter beans that would otherwise be
     * added to the application context.
     * @return exclude filters to apply
     */
    ComponentScan.Filter[] excludeFilters() default {};

    /**
     * Auto-configuration exclusions that should be applied for this test.
     * @return auto-configuration exclusions to apply
     */
    @AliasFor(annotation = ImportAutoConfiguration.class, attribute = "exclude")
    Class<?>[] excludeAutoConfiguration() default {};
}
