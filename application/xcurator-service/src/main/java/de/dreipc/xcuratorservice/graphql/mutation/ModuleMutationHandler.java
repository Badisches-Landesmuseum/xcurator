package de.dreipc.xcuratorservice.graphql.mutation;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import de.dreipc.xcuratorservice.command.story.CreateModuleCommand;
import de.dreipc.xcuratorservice.command.story.DeleteModuleCommand;
import de.dreipc.xcuratorservice.command.story.UpdateModuleCommand;
import de.dreipc.xcuratorservice.data.story.StoryTextModule;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import dreipc.common.graphql.exception.BadRequestException;
import dreipc.graphql.types.*;
import graphql.execution.DataFetcherResult;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Component
@DgsComponent
public class ModuleMutationHandler {

    private final CreateModuleCommand createModuleCommand;
    private final DeleteModuleCommand deleteModuleCommand;
    private final UpdateModuleCommand updateModuleCommand;

    public ModuleMutationHandler(
            CreateModuleCommand createModuleCommand,
            UpdateModuleCommand updateModuleCommand,
            DeleteModuleCommand deleteModuleCommand) {
        this.createModuleCommand = createModuleCommand;
        this.updateModuleCommand = updateModuleCommand;
        this.deleteModuleCommand = deleteModuleCommand;
    }

    @DgsMutation
    public CompletableFuture<DataFetcherResult<StoryTextModule>> createModule(
            @InputArgument CreateModuleInput create, @InputArgument Language language) {
        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(null, new Locale(language.name()));

        return CompletableFuture.supplyAsync(() ->
                        createModuleCommand.execute(create.getStoryId(), create.getArtefactIds(), create.getThought()))
                .thenApply(data -> DataFetcherResult.<StoryTextModule>newResult()
                        .data(data)
                        .localContext(localContext)
                        .build());
    }

    @DgsMutation
    public String deleteModule(@InputArgument DeleteModuleInput delete) {
        return deleteModuleCommand.execute(delete.getStoryId(), delete.getModuleId());
    }

    @DgsMutation
    public DataFetcherResult<StoryTextModule> updateModule(@InputArgument UpdateModuleInput update) {
        var inputIds = update.getArtefactIds() == null ? new HashSet<String>() : new HashSet<>(update.getArtefactIds());

        var artefactIds = inputIds.stream().map(ObjectId::new).collect(Collectors.toSet());

        if (artefactIds.size() > 3) {
            throw new BadRequestException("ArtefactIds cannot contain more than 3 elements");
        }

        StoryTextModule module = updateModuleCommand.execute(
                update.getStoryId(), update.getModuleId(), artefactIds, update.getThought(), update.getIndex());
        Language language = updateModuleCommand.getLanguage(update.getStoryId());

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(null, new Locale(language.name()));

        return DataFetcherResult.<StoryTextModule>newResult()
                .data(module)
                .localContext(localContext)
                .build();
    }
}
