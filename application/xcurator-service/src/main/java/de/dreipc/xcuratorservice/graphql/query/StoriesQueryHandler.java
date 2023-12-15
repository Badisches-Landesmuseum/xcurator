package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.*;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.Language;
import dreipc.graphql.types.StoryOrderByInput;
import graphql.execution.DataFetcherResult;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;

@DgsComponent
public class StoriesQueryHandler {

    private final StoryRepository storyRepository;

    public StoriesQueryHandler(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<List<Story>>> stories(
            @InputArgument Language language,
            @InputArgument StoryOrderByInput orderBy,
            DgsDataFetchingEnvironment dfe) {
        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();
        UserIdLanguageLocalContext localContext;
        if (user != null) {
            String id = user.getId();
            localContext = new UserIdLanguageLocalContext(id, new Locale(language.name()));
        } else {
            localContext = new UserIdLanguageLocalContext(null, new Locale(language.name()));
        }

        String property = "id";

        if (orderBy != null) {
            if (orderBy.getRating() != null) {
                property = "rating";
            } else if (orderBy.getCreatedAt() != null) {
                property = "createdAt";
            }
        }

        Sort sort = Sort.by(Sort.Direction.DESC, property);

        return CompletableFuture.supplyAsync(() -> storyRepository.findAll(sort))
                .thenApply(data -> DataFetcherResult.<List<Story>>newResult()
                        .data(data)
                        .localContext(localContext)
                        .build());
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<List<Story>>> myStories(
            @InputArgument Language language, DgsDataFetchingEnvironment dfe) {
        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();
        String id = user.getId();
        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(id, new Locale(language.name()));
        return CompletableFuture.supplyAsync(() -> storyRepository.getStoriesByAuthor(id))
                .thenApply(data -> DataFetcherResult.<List<Story>>newResult()
                        .data(data)
                        .localContext(localContext)
                        .build());
    }
}
