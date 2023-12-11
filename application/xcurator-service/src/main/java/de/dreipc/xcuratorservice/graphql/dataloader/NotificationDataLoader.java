package de.dreipc.xcuratorservice.graphql.dataloader;

import de.dreipc.xcuratorservice.data.story.StoryNotification;
import de.dreipc.xcuratorservice.data.story.StoryNotificationRepository;
import org.dataloader.MappedBatchLoader;

import java.util.ArrayList;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

public class NotificationDataLoader implements MappedBatchLoader<String, StoryNotification> {

    private final StoryNotificationRepository repository;
    private final Executor executor;

    public NotificationDataLoader(StoryNotificationRepository repository, Executor executor) {
        this.repository = repository;
        this.executor = executor;
    }

    @Override
    public CompletionStage<Map<String, StoryNotification>> load(Set<String> ids) {
        return CompletableFuture.supplyAsync(
                () -> repository.findAllById(new ArrayList<>(ids)).stream()
                        .collect(Collectors.toMap(StoryNotification::getId, object -> object)),
                executor);
    }
}
