package de.dreipc.xcuratorservice.graphql.dataloader;

import com.netflix.graphql.dgs.DgsDataLoader;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.data.story.StoryTextModule;
import org.bson.types.ObjectId;
import org.dataloader.MappedBatchLoader;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Comparator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

@DgsDataLoader(name = "stories")
public class StoryDataLoader implements MappedBatchLoader<ObjectId, Story> {

    private final StoryRepository repository;

    private final Executor executor;

    public StoryDataLoader(StoryRepository repository, @Qualifier("applicationTaskExecutor") Executor executor) {
        this.repository = repository;
        this.executor = executor;
    }

    @Override
    public CompletionStage<Map<ObjectId, Story>> load(Set<ObjectId> ids) {
        return CompletableFuture.supplyAsync(
                () -> repository.findAllById(ids).stream()
                        .peek(story -> {
                            if (story.getModules() != null) {
                                story.setModules(story.getModules().stream()
                                        .sorted(Comparator.comparing(StoryTextModule::getIndex))
                                        .collect(Collectors.toList()));
                            }
                        })
                        .collect(Collectors.toMap(Story::getId, object -> object)),
                executor);
    }
}
