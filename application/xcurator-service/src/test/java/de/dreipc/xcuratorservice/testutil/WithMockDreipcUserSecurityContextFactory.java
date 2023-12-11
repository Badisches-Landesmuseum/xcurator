package de.dreipc.xcuratorservice.testutil;

import dreipc.common.graphql.session.DreipcUser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class WithMockDreipcUserSecurityContextFactory implements WithSecurityContextFactory<WithDreipcUser> {
    @Override
    public SecurityContext createSecurityContext(WithDreipcUser customUser) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Collection<GrantedAuthority> authorities = Arrays.stream(customUser.roles())
                .sequential()
                .map(role -> {
                    if (role.startsWith("ROLE_")) return new SimpleGrantedAuthority(role);
                    else return new SimpleGrantedAuthority("ROLE_" + role.toUpperCase());
                })
                .collect(Collectors.toList());
        var user = new DreipcUser(customUser.id(), true, authorities);
        Authentication auth = new UsernamePasswordAuthenticationToken(user, "password", user.getAuthorities());
        context.setAuthentication(auth);
        return context;
    }
}
