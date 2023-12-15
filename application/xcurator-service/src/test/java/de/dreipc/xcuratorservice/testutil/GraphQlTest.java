package de.dreipc.xcuratorservice.testutil;

import com.netflix.graphql.dgs.autoconfig.DgsAutoConfiguration;
import dreipc.common.graphql.context.SecurityContextBuilder;
import dreipc.common.graphql.schema.CustomDirectiveRegistration;
import dreipc.common.graphql.schema.CustomScalarRegistration;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Import({
    DgsAutoConfiguration.class,
    CustomScalarRegistration.class,
    CustomDirectiveRegistration.class,
    SecurityContextBuilder.class,
    GraphQLTestConfiguration.class
})
@ExtendWith(SpringExtension.class)
@ExtendWith(GraphQLTestConfiguration.class)
public @interface GraphQlTest {}
