package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.*;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactNotification;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryNotification;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import de.dreipc.xcuratorservice.graphql.dataloader.ArtefactDataLoader;
import de.dreipc.xcuratorservice.graphql.dataloader.StoryDataLoader;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.exception.BadRequestException;
import dreipc.common.graphql.exception.NotFoundException;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.ArtefactNotificationUniqueInput;
import dreipc.graphql.types.Language;
import dreipc.graphql.types.StoryNotificationUniqueInput;
import graphql.execution.DataFetcherResult;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;

@Component
@DgsComponent
public class NotificationQueryHandler {

    private final MongoTemplate template;

    public NotificationQueryHandler(MongoTemplate template) {
        this.template = template;
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<StoryNotification>> reportedStory(
            @InputArgument StoryNotificationUniqueInput where,
            @InputArgument Language language,
            @NonNull DgsDataFetchingEnvironment env) {
        String id = where.getId();

        if (!ObjectId.isValid(id)) {
            throw new BadRequestException("The provided id is not a valid id");
        }

        Query query = new Query(Criteria.where("_id").is(id));

        if (!template.exists(query, StoryNotification.class)) {
            throw new NotFoundException("Notification with id " + id + "not found");
        }

        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        UserIdLanguageLocalContext localContext =
                new UserIdLanguageLocalContext(user.getId(), new Locale(language.name()));

        return CompletableFuture.supplyAsync(() -> template.findOne(query, StoryNotification.class))
                .thenApply(data -> DataFetcherResult.<StoryNotification>newResult()
                        .data(data)
                        .localContext(localContext)
                        .build());
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<List<StoryNotification>>> reportedStories(
            @InputArgument Language language, @NotNull DgsDataFetchingEnvironment env) {
        Query query =
                new Query(Criteria.where("isDeleted").is(false).and("isRead").is(false));
        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        UserIdLanguageLocalContext localContext =
                new UserIdLanguageLocalContext(user.getId(), new Locale(language.name()));

        return CompletableFuture.supplyAsync(() -> template.find(query, StoryNotification.class))
                .thenApply(data -> DataFetcherResult.<List<StoryNotification>>newResult()
                        .data(data)
                        .localContext(localContext)
                        .build());
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<List<ArtefactNotification>>> reportedArtefacts(
            @InputArgument Language language) {
        Query query =
                new Query(Criteria.where("isDeleted").is(false).and("isRead").is(false));

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(null, new Locale(language.name()));

        return CompletableFuture.supplyAsync(() -> template.find(query, ArtefactNotification.class))
                .thenApply(data -> DataFetcherResult.<List<ArtefactNotification>>newResult()
                        .data(data)
                        .localContext(localContext)
                        .build());
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<ArtefactNotification>> reportedArtefact(
            @InputArgument ArtefactNotificationUniqueInput where,
            @InputArgument Language language,
            @NonNull DgsDataFetchingEnvironment env) {
        String id = where.getId();

        if (!ObjectId.isValid(id)) throw new BadRequestException("The provided id is not a valid id");

        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        UserIdLanguageLocalContext localContext =
                new UserIdLanguageLocalContext(user.getId(), new Locale(language.name()));

        Query query = new Query(Criteria.where("_id").is(id));

        return CompletableFuture.supplyAsync(() -> template.findOne(query, ArtefactNotification.class))
                .thenApply(data -> DataFetcherResult.<ArtefactNotification>newResult()
                        .data(data)
                        .localContext(localContext)
                        .build());
    }

    @DgsData(parentType = "Notification")
    public CompletableFuture<DataFetcherResult<Story>> story(@NotNull DgsDataFetchingEnvironment env) {
        var source = (StoryNotification) env.getSource();
        ObjectId storyId = source.getStoryId();

        var localContext = env.getLocalContext();

        var dataLoader = env.<ObjectId, Story>getDataLoader(StoryDataLoader.class);

        return dataLoader.load(storyId).thenApply(data -> DataFetcherResult.<Story>newResult()
                .data(data)
                .localContext(localContext)
                .build());
    }

    @DgsData(parentType = "ArtefactNotification")
    public CompletableFuture<DataFetcherResult<Artefact>> artefact(@NotNull DgsDataFetchingEnvironment env) {
        var source = (ArtefactNotification) env.getSource();
        ObjectId artefactId = new ObjectId(source.getArtefactId());

        var localContext = env.getLocalContext();

        var dataLoader = env.<ObjectId, Artefact>getDataLoader(ArtefactDataLoader.class);

        return dataLoader.load(artefactId).thenApply(data -> DataFetcherResult.<Artefact>newResult()
                .data(data)
                .localContext(localContext)
                .build());
    }
}
