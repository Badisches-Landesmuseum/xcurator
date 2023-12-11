package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.*;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.profile.Continent;
import de.dreipc.xcuratorservice.data.profile.ProfileEpoch;
import de.dreipc.xcuratorservice.data.profile.UserProfile;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import de.dreipc.xcuratorservice.graphql.dataloader.ArtefactDataLoader;
import de.dreipc.xcuratorservice.graphql.dataloader.UserProfileDataLoader;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.User;
import graphql.execution.DataFetcherResult;
import org.bson.types.ObjectId;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@DgsComponent
public class ProfileQueryHandler {

    private final ArtefactRepository artefactRepository;

    public ProfileQueryHandler(ArtefactRepository artefactRepository) {
        this.artefactRepository = artefactRepository;
    }

    @DgsEntityFetcher(name = "User")
    public User user(DgsDataFetchingEnvironment env) {
        SpringSecurityContext securityContext = DgsContext.getCustomContext(env);
        var user = (DreipcUser) securityContext.currentUser();
        return new User(user.getId(), null);
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<UserProfile>> profile(DgsDataFetchingEnvironment env) {
        SpringSecurityContext securityContext = DgsContext.getCustomContext(env);
        var user = (DreipcUser) securityContext.currentUser();

        var dataLoader = env.<String, UserProfile>getDataLoader(UserProfileDataLoader.class);

        return dataLoader.load(user.getId()).thenApply(data -> DataFetcherResult.<UserProfile>newResult()
                .data(data)
                .localContext(
                        data != null && data.getPreferredLanguage() != null
                                ? new UserIdLanguageLocalContext(user.getId(), data.getPreferredLanguage())
                                : new UserIdLanguageLocalContext(user.getId(), Locale.GERMAN))
                .build());
    }

    @DgsData(parentType = "UserProfile")
    public CompletableFuture<List<Artefact>> favorites(DgsDataFetchingEnvironment env) {
        UserProfile profile = env.getSource();

        if (profile.getArtefactFavorites() == null
                || profile.getArtefactFavorites().isEmpty())
            return CompletableFuture.supplyAsync(Collections::emptyList);

        var dataLoader = env.<ObjectId, Artefact>getDataLoader(ArtefactDataLoader.class);
        return dataLoader.loadMany(profile.getArtefactFavorites()).thenApply(artefacts -> artefacts.stream()
                .filter(Objects::nonNull)
                .toList());
    }

    @DgsQuery
    public CompletableFuture<DataFetcherResult<List<Artefact>>> myFavourites(DgsDataFetchingEnvironment env) {
        return this.profile(env).thenApply(profileResult -> {
            var favourites = profileResult.getData().getArtefactFavorites();
            List<Artefact> artefacts = artefactRepository.findAllById(favourites);

            return DataFetcherResult.<List<Artefact>>newResult()
                    .data(artefacts)
                    .localContext(profileResult.getLocalContext())
                    .build();
        });
    }

    @DgsData(parentType = "UserProfile")
    public List<ProfileEpoch> epochs(DgsDataFetchingEnvironment env) {
        UserProfile profile = env.getSource();
        if (profile.getEpochs() == null) return Collections.emptyList();
        return profile.getEpochs();
    }

    @DgsData(parentType = "UserProfile")
    public List<Continent> continents(DgsDataFetchingEnvironment env) {
        UserProfile profile = env.getSource();
        if (profile.getContinents() == null) return Collections.emptyList();
        else return profile.getContinents();
    }
}
