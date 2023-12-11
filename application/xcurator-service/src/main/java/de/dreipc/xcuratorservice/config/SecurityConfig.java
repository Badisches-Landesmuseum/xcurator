package de.dreipc.xcuratorservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.savedrequest.NullRequestCache;

/**
 * Security Config enables the Spring Security with JWT.
 * Sessions will be crated inside the GraphQL Gateway!
 */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Kubernetes Endpoints
        http.authorizeHttpRequests(authenticator -> authenticator
                .requestMatchers(HttpMethod.GET, "/manage/health/readiness", "/manage/health/liveness")
                .permitAll());

        // GraphQL
        http.authorizeHttpRequests(authenticator -> authenticator
                .requestMatchers(HttpMethod.GET, "graphql")
                .permitAll()
                .requestMatchers(HttpMethod.POST, "/graphql")
                .permitAll());

        // Sessions are controlled by the Gateway || DO NOT CREATE ONE YOURSELF
        http.sessionManagement((session) -> {
            session.sessionCreationPolicy(SessionCreationPolicy.NEVER);
        });

        // Do not cache Requests in the session! We use the redis Session here!
        var nullRequestCache = new NullRequestCache();
        http.requestCache((cache) -> cache.requestCache(nullRequestCache));

        // CORS and CSRF - disabled due to no public endpoint
        http.cors(AbstractHttpConfigurer::disable);
        http.csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
