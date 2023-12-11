package de.dreipc.xcuratorservice.testutil;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.context.annotation.Import;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@ExtendWith(TestcontainersInitializer.class)
@Import(TestcontainersInitializer.class)
public @interface EnableTestcontainers {
    boolean mongo() default false;

    boolean elastic() default false;

    boolean redis() default false;

    boolean clip() default false;
}
