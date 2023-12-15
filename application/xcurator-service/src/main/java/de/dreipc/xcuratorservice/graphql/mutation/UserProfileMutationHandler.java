package de.dreipc.xcuratorservice.graphql.mutation;

import com.netflix.graphql.dgs.*;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.command.profile.CreateUserProfileCommand;
import de.dreipc.xcuratorservice.command.profile.DeleteUserProfileCommand;
import de.dreipc.xcuratorservice.command.profile.UpdateUserProfileCommand;
import de.dreipc.xcuratorservice.data.profile.*;
import de.dreipc.xcuratorservice.data.profile.Continent;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.exception.BadRequestException;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.CreateUserProfileInput;
import dreipc.graphql.types.UpdateUserProfileInput;
import dreipc.graphql.types.UserUniqueInput;

import java.util.Locale;
import java.util.Objects;

@DgsComponent
public class UserProfileMutationHandler {

    private final CreateUserProfileCommand createCommand;
    private final UpdateUserProfileCommand updateCommand;
    private final DeleteUserProfileCommand deleteCommand;

    private final UserProfileRepository userProfileRepository;

    public UserProfileMutationHandler(
            CreateUserProfileCommand createCommand,
            UpdateUserProfileCommand updateCommand,
            DeleteUserProfileCommand deleteCommand,
            UserProfileRepository userProfileRepository) {
        this.createCommand = createCommand;
        this.updateCommand = updateCommand;
        this.deleteCommand = deleteCommand;
        this.userProfileRepository = userProfileRepository;
    }

    @DgsMutation
    public UserProfile createUserProfile(@InputArgument CreateUserProfileInput create, DgsDataFetchingEnvironment env) {
        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        var language = new Locale(create.getPreferredLanguage().name());
        String username = user.getUsername();
        return createCommand.execute(user.getId(), username, language);
    }

    @DgsMutation
    public UserProfile updateUserProfile(@InputArgument UpdateUserProfileInput update, DgsDataFetchingEnvironment env) {
        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        var language = new Locale(update.getPreferredLanguage().name());

        var profileBuilder = UserProfile.builder()
                .id(user.getId())
                .preferredLanguage(language)
                .continents(update.getContinents().stream()
                        .map(e -> castEnum(e, Continent.class))
                        .toList())
                .epochs(update.getEpochs().stream()
                        .map(e -> castEnum(e, ProfileEpoch.class))
                        .toList());

        if (update.getVisitorRole() != null)
            profileBuilder.visitorRole(castEnum(update.getVisitorRole(), VisitorRole.class));
        if (update.getVisitorTarget() != null)
            profileBuilder.visitorTarget(castEnum(update.getVisitorTarget(), VisitorTarget.class));
        if (update.getVisitorWish() != null)
            profileBuilder.visitorWish(castEnum(update.getVisitorWish(), VisitorWish.class));
        if (update.getUsername() != null) profileBuilder.username(update.getUsername());

        var profile = profileBuilder.build();
        return updateCommand.execute(user.getId(), profile);
    }

    @DgsMutation
    public String deleteUserProfile(@InputArgument UserUniqueInput delete, DgsDataFetchingEnvironment env) {
        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        if (!Objects.equals(user.getId(), delete.getSub())) {
            throw new BadRequestException("You are not allowed to delete this profile");
        } else {
            return deleteCommand.execute(delete.getSub());
        }
    }

    @DgsMutation
    public String exportProfile(@InputArgument UserUniqueInput where) {
        if (where.getSub().isEmpty()) {
            throw new IllegalArgumentException("Empty input is not allowed! please add some input on sub.");
        }

        String id = where.getSub();

        var userProfile = userProfileRepository.findById(id);

        if (userProfile.isEmpty()) {
            throw new IllegalArgumentException("User with id " + id + " not found");
        }

        return userProfileRepository.findUserDataById(id).toJson();
    }

    private static <E1 extends Enum<E1>, E2 extends Enum<E2>> E2 castEnum(E1 input, Class<E2> e2) {
        int pos = input.ordinal();
        return e2.getEnumConstants()[pos];
    }
}
