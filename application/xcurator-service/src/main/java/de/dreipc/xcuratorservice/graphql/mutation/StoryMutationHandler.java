package de.dreipc.xcuratorservice.graphql.mutation;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsDataFetchingEnvironment;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.command.story.*;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryNotification;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.exception.BadRequestException;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.*;
import graphql.execution.DataFetcherResult;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
@DgsComponent
public class StoryMutationHandler {

    private final CreateStoryCommand storeStoryCommand;
    private final UpdateStoryCommand updateStoryCommand;
    private final DeleteStoryCommand deleteStoryCommand;
    private final CreateRatingCommand ratingCommand;
    private final PublishStoryCommand publishStoryCommand;
    private final UnpublishStoryCommand unpublishStoryCommand;
    private final CreateStoryNotificationCommand createStoryNotificationCommand;
    private final UpdateStoryNotificationCommand updateStoryNotificationCommand;
    private final DeleteStoryNotificationCommand deleteStoryNotificationCommand;

    private final SetStoryConclutionCommand setStoryConclutionCommand;
    private final SetStoryIntroductionCommand setStoryIntroductionCommand;

    public StoryMutationHandler(
            CreateStoryCommand storeStoryCommand,
            UpdateStoryCommand updateStoryCommand,
            DeleteStoryCommand deleteStoryCommand,
            CreateRatingCommand ratingCommand,
            PublishStoryCommand publishStoryCommand,
            UnpublishStoryCommand unpublishStoryCommand,
            CreateStoryNotificationCommand createStoryNotificationCommand,
            UpdateStoryNotificationCommand updateStoryNotificationCommand,
            DeleteStoryNotificationCommand deleteStoryNotificationCommand,
            SetStoryConclutionCommand setStoryConclutionCommand,
            SetStoryIntroductionCommand setStoryIntroductionCommand) {
        this.storeStoryCommand = storeStoryCommand;
        this.deleteStoryCommand = deleteStoryCommand;
        this.updateStoryCommand = updateStoryCommand;
        this.ratingCommand = ratingCommand;
        this.publishStoryCommand = publishStoryCommand;
        this.unpublishStoryCommand = unpublishStoryCommand;
        this.createStoryNotificationCommand = createStoryNotificationCommand;
        this.updateStoryNotificationCommand = updateStoryNotificationCommand;
        this.deleteStoryNotificationCommand = deleteStoryNotificationCommand;
        this.setStoryConclutionCommand = setStoryConclutionCommand;
        this.setStoryIntroductionCommand = setStoryIntroductionCommand;
    }

    @DgsMutation
    public DataFetcherResult<Story> createStory(@InputArgument StoryInput create, DgsDataFetchingEnvironment dfe) {
        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();

        Story story = storeStoryCommand.execute(
                create.getTitle(), create.getLanguage(), create.getArtefactId(), user.getId());

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(
                user.getId(), new Locale(story.getLanguage().name()));

        return DataFetcherResult.<Story>newResult()
                .data(story)
                .localContext(localContext)
                .build();
    }

    @DgsMutation
    public String deleteStory(@InputArgument DeleteStoryInput delete) {
        if (!ObjectId.isValid(delete.getStoryId()))
            throw new IllegalArgumentException(
                    "Given id (" + delete.getStoryId() + ") is not a valid ObjectId (MongoDb)");

        var objectId = new ObjectId(delete.getStoryId());
        return deleteStoryCommand.execute(objectId);
    }

    @DgsMutation
    public DataFetcherResult<Story> updateStory(
            @InputArgument UpdateStoryInput update, DgsDataFetchingEnvironment dfe) {
        if (!ObjectId.isValid(update.getStoryID()))
            throw new IllegalArgumentException("Given id (" + update.getStoryID() + ") is not a valid id.");

        Story story = updateStoryCommand.execute(
                new ObjectId(update.getStoryID()), update.getTitle(), update.getArtefactId(), update.getLicence());

        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(
                user.getId(), new Locale(story.getLanguage().name()));

        return DataFetcherResult.<Story>newResult()
                .data(story)
                .localContext(localContext)
                .build();
    }

    @DgsMutation
    public Float rateStory(@InputArgument RateStoryInput where, DgsDataFetchingEnvironment dfe) {

        var ratingScore = (float) where.getRating();

        if (ratingScore < 1.0f || ratingScore > 5.0f)
            throw new BadRequestException("Rating value out of scope. Value needs to be between 1.0 and 5.0");

        if (!ObjectId.isValid(where.getId()))
            throw new BadRequestException("Given story id (" + where.getId() + ") is not a valid id");

        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();

        var storyId = new ObjectId(where.getId());

        return ratingCommand.execute(ratingScore, storyId, user.getId());
    }

    @DgsMutation
    public DataFetcherResult<Story> publishStory(
            @InputArgument PublishStoryInput where, DgsDataFetchingEnvironment dfe) {
        var storyId = new ObjectId(where.getId());
        Story story = publishStoryCommand.execute(storyId);
        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(
                user.getId(), new Locale(story.getLanguage().name()));

        return DataFetcherResult.<Story>newResult()
                .data(story)
                .localContext(localContext)
                .build();
    }

    @DgsMutation
    public DataFetcherResult<Story> unpublishStory(
            @InputArgument PublishStoryInput where, DgsDataFetchingEnvironment dfe) {
        var storyId = new ObjectId(where.getId());
        Story story = unpublishStoryCommand.execute(storyId);
        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(
                user.getId(), new Locale(story.getLanguage().name()));

        return DataFetcherResult.<Story>newResult()
                .data(story)
                .localContext(localContext)
                .build();
    }

    @DgsMutation
    public StoryNotification reportStory(@InputArgument StoryNotificationInput create, DgsDataFetchingEnvironment dfe) {
        SpringSecurityContext context = DgsContext.getCustomContext(dfe);
        var user = (DreipcUser) context.currentUser();

        if (!ObjectId.isValid(create.getStoryId()))
            throw new BadRequestException("Given id (" + create.getStoryId() + ") is not a valid id.");

        var storyId = new ObjectId(create.getStoryId());
        var userId = user.getId();

        return createStoryNotificationCommand.execute(userId, storyId);
    }

    @DgsMutation
    public StoryNotification updateStoryNotification(@InputArgument UpdateStoryNotificationInput update) {
        if (!ObjectId.isValid(update.getId()))
            throw new BadRequestException("Given id (" + update.getId() + ") is not a valid id.");

        var notificationId = new ObjectId(update.getId());
        var isRead = update.getIsRead();

        return updateStoryNotificationCommand.execute(notificationId, isRead);
    }

    @DgsMutation
    public String deleteStoryNotification(@InputArgument DeleteStoryNotificationInput delete) {
        if (!ObjectId.isValid(delete.getId()))
            throw new BadRequestException("Given id (" + delete.getId() + ") is not a valid id.");

        var notificationId = new ObjectId(delete.getId());

        return deleteStoryNotificationCommand.execute(notificationId);
    }

    // ToDo: implement
    @DgsMutation
    public Story setStoryIntroduction(@InputArgument StoryIntroductionInput where) {
        if (!ObjectId.isValid(where.getStoryId()))
            throw new BadRequestException("Given id (" + where.getStoryId() + ") is not a valid id.");

        var storyId = new ObjectId(where.getStoryId());
        return setStoryIntroductionCommand.execute(storyId, where.getIntroduction());
    }

    @DgsMutation
    public Story setStoryConclusion(@InputArgument StoryConclusionInput where) {
        if (!ObjectId.isValid(where.getStoryId()))
            throw new BadRequestException("Given id (" + where.getStoryId() + ") is not a valid id.");

        var storyId = new ObjectId(where.getStoryId());
        return setStoryConclutionCommand.execute(storyId, where.getConclusion());
    }
}
