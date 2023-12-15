package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.*;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.Image;
import de.dreipc.xcuratorservice.data.profile.UserProfile;
import de.dreipc.xcuratorservice.data.story.Rating;
import de.dreipc.xcuratorservice.data.story.RatingRepository;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryTextModule;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import de.dreipc.xcuratorservice.graphql.dataloader.ArtefactDataLoader;
import de.dreipc.xcuratorservice.graphql.dataloader.StoryDataLoader;
import de.dreipc.xcuratorservice.graphql.dataloader.UserProfileDataLoader;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.Language;
import dreipc.graphql.types.StoryUniqueInput;
import dreipc.graphql.types.User;
import graphql.execution.DataFetcherResult;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@DgsComponent
public class StoryQueryHandler {

    private final RatingRepository ratingRepository;

    public StoryQueryHandler(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<Story>> story(
            @InputArgument StoryUniqueInput where, DgsDataFetchingEnvironment env) {
        var id = new ObjectId(where.getId());
        Language language = where.getLanguage();
        var dataLoader = env.<ObjectId, Story>getDataLoader(StoryDataLoader.class);
        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();
        String userId = null;

        if (user != null) {
            userId = user.getId();
        }

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(userId, new Locale(language.name()));
        return dataLoader.load(id).thenApply(data -> DataFetcherResult.<Story>newResult()
                .data(data)
                .localContext(localContext)
                .build());
    }

    @DgsData(parentType = "Story")
    public CompletableFuture<DataFetcherResult<User>> author(@NotNull DgsDataFetchingEnvironment env) {
        var source = (Story) env.getSource();
        String id = source.getAuthorId();

        var dataLoader = env.<String, UserProfile>getDataLoader(UserProfileDataLoader.class);

        return dataLoader.load(id).thenApply(data -> DataFetcherResult.<User>newResult()
                .data(new User(id, data.getUsername()))
                .build());
    }

    @DgsData(parentType = "Story")
    public Float myRating(@NotNull DgsDataFetchingEnvironment env) {
        var source = (Story) env.getSource();
        var StoryId = source.getId();
        UserIdLanguageLocalContext localContext = env.getLocalContext();
        String userId = localContext.userId();
        if (userId != null) {
            Rating rating = ratingRepository.getRatingByStoryIdAndUserId(StoryId, userId);
            if (rating != null) return rating.getRating();
        }
        return null;
    }

    @DgsData(parentType = "Story")
    public CompletableFuture<Image> previewImage(@NotNull DgsDataFetchingEnvironment env) {
        var story = (Story) env.getSource();
        var modules = story.getModules();

        if (modules == null) return null;
        if (modules.isEmpty()) return null;

        var firstModule = modules.get(0);
        var artefactIds = firstModule.getArtefactIds();

        if (artefactIds.isEmpty()) return null;

        var dataLoader = env.<ObjectId, Artefact>getDataLoader(ArtefactDataLoader.class);
        return dataLoader
                .load(artefactIds.iterator().next())
                .thenApply(Artefact::getImages)
                .thenApply(images -> images.isEmpty() ? null : images.get(0));
    }

    @DgsData(parentType = "StoryTextModule")
    public CompletableFuture<List<Artefact>> artefacts(@NotNull DgsDataFetchingEnvironment env) {
        var source = (StoryTextModule) env.getSource();

        var artefactIds = source.getArtefactIds();
        var dataLoader = env.<ObjectId, Artefact>getDataLoader(ArtefactDataLoader.class);

        return dataLoader.loadMany(new ArrayList<>(artefactIds));
    }

    @DgsData(parentType = "Story")
    public CompletableFuture<List<Artefact>> artefactBasket(@NotNull DgsDataFetchingEnvironment env) {
        var source = (Story) env.getSource();

        var artefactIds = source.getArtefactBasket();
        var dataLoader = env.<ObjectId, Artefact>getDataLoader(ArtefactDataLoader.class);

        if (artefactIds == null) return null;

        return dataLoader.loadMany(artefactIds).thenApply(artefacts -> {
            if (artefacts.isEmpty()) {
                return null;
            }
            return artefacts;
        });
    }
}
