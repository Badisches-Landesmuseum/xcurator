package de.dreipc.xcuratorservice.graphql.dataloader;

import com.netflix.graphql.dgs.DgsDataLoader;
import de.dreipc.xcuratorservice.data.story.Rating;
import de.dreipc.xcuratorservice.data.story.RatingRepository;
import org.bson.types.ObjectId;
import org.dataloader.MappedBatchLoader;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

@DgsDataLoader(name = "ratings")
public class RatingDataLoader implements MappedBatchLoader<ObjectId, Rating> {

    private final RatingRepository repository;

    private final Executor executor;

    public RatingDataLoader(RatingRepository repository, @Qualifier("applicationTaskExecutor") Executor executor) {
        this.repository = repository;
        this.executor = executor;
    }

    @Override
    public CompletionStage<Map<ObjectId, Rating>> load(Set<ObjectId> ids) {
        return CompletableFuture.supplyAsync(
                () -> repository.findAllById(ids).stream().collect(Collectors.toMap(Rating::getId, object -> object)),
                executor);
    }
}
