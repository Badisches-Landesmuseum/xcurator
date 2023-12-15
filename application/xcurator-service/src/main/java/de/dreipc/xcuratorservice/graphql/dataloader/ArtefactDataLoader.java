package de.dreipc.xcuratorservice.graphql.dataloader;

import com.netflix.graphql.dgs.DgsDataLoader;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import org.bson.types.ObjectId;
import org.dataloader.MappedBatchLoader;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

@DgsDataLoader(name = "artefacts")
public class ArtefactDataLoader implements MappedBatchLoader<ObjectId, Artefact> {

    private final ArtefactRepository repository;

    private final Executor executor;

    public ArtefactDataLoader(ArtefactRepository repository, @Qualifier("applicationTaskExecutor") Executor executor) {
        this.repository = repository;
        this.executor = executor;
    }

    @Override
    public CompletionStage<Map<ObjectId, Artefact>> load(Set<ObjectId> ids) {
        return CompletableFuture.supplyAsync(
                () -> repository.findAllById(ids).stream().collect(Collectors.toMap(Artefact::getId, object -> object)),
                executor);
    }
}
