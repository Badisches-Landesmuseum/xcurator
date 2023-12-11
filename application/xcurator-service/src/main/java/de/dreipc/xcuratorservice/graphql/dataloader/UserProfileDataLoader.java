package de.dreipc.xcuratorservice.graphql.dataloader;

import com.netflix.graphql.dgs.DgsDataLoader;
import de.dreipc.xcuratorservice.data.profile.UserProfile;
import de.dreipc.xcuratorservice.data.profile.UserProfileRepository;
import org.dataloader.MappedBatchLoader;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.ArrayList;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

@DgsDataLoader(name = "userprofile")
public class UserProfileDataLoader implements MappedBatchLoader<String, UserProfile> {

    private final UserProfileRepository repository;
    private final Executor executor;

    public UserProfileDataLoader(
            UserProfileRepository repository, @Qualifier("applicationTaskExecutor") Executor executor) {
        this.repository = repository;
        this.executor = executor;
    }

    @Override
    public CompletionStage<Map<String, UserProfile>> load(Set<String> ids) {
        return CompletableFuture.supplyAsync(
                () -> repository.findAllById(new ArrayList<>(ids)).stream()
                        .collect(Collectors.toMap(UserProfile::getId, object -> object)),
                executor);
    }
}
