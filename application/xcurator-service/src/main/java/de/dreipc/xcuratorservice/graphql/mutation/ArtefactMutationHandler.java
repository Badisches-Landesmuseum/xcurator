package de.dreipc.xcuratorservice.graphql.mutation;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsDataFetchingEnvironment;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import com.netflix.graphql.dgs.context.DgsContext;
import de.dreipc.xcuratorservice.command.artefact.CreateArtefactNotificationCommand;
import de.dreipc.xcuratorservice.command.artefact.DeleteArtefactNotificationCommand;
import de.dreipc.xcuratorservice.command.artefact.UpdateArtefactNotificationCommand;
import de.dreipc.xcuratorservice.command.artefact.VerifyNamedEntityCommand;
import de.dreipc.xcuratorservice.command.profile.AddArtefactFavouriteCommand;
import de.dreipc.xcuratorservice.command.profile.DeleteArtefactFavouriteCommand;
import de.dreipc.xcuratorservice.command.story.AddArtefactToBasketCommand;
import de.dreipc.xcuratorservice.command.story.DeleteArtefactFromBasketCommand;
import de.dreipc.xcuratorservice.data.artefact.ArtefactNotification;
import de.dreipc.xcuratorservice.data.artefact.NamedEntity;
import de.dreipc.xcuratorservice.data.entity.NamedEntityId;
import de.dreipc.xcuratorservice.data.story.Story;
import dreipc.common.graphql.context.SpringSecurityContext;
import dreipc.common.graphql.exception.BadRequestException;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.*;
import org.bson.types.ObjectId;

import java.util.Locale;

@DgsComponent
public class ArtefactMutationHandler {
    private final AddArtefactToBasketCommand addArtefactToBasketCommand;
    private final DeleteArtefactFromBasketCommand deleteArtefactFromBasketCommand;
    private final AddArtefactFavouriteCommand addArtefactFavouriteCommand;
    private final DeleteArtefactFavouriteCommand deleteArtefactFavouriteCommand;
    private final CreateArtefactNotificationCommand createArtefactNotificationCommand;
    private final UpdateArtefactNotificationCommand updateArtefactNotificationCommand;
    private final DeleteArtefactNotificationCommand deleteArtefactNotificationCommand;

    private final VerifyNamedEntityCommand verifyNamedEntityCommand;

    public ArtefactMutationHandler(
            AddArtefactToBasketCommand addArtefactToBasketCommand,
            DeleteArtefactFromBasketCommand deleteArtefactFromBasketCommand,
            AddArtefactFavouriteCommand addArtefactFavouriteCommand,
            DeleteArtefactFavouriteCommand deleteArtefactFavouriteCommand,
            CreateArtefactNotificationCommand createArtefactNotificationCommand,
            UpdateArtefactNotificationCommand updateArtefactNotificationCommand,
            DeleteArtefactNotificationCommand deleteArtefactNotificationCommand,
            VerifyNamedEntityCommand verifyNamedEntityCommand) {
        this.addArtefactToBasketCommand = addArtefactToBasketCommand;
        this.deleteArtefactFromBasketCommand = deleteArtefactFromBasketCommand;
        this.addArtefactFavouriteCommand = addArtefactFavouriteCommand;
        this.deleteArtefactFavouriteCommand = deleteArtefactFavouriteCommand;
        this.createArtefactNotificationCommand = createArtefactNotificationCommand;
        this.updateArtefactNotificationCommand = updateArtefactNotificationCommand;
        this.deleteArtefactNotificationCommand = deleteArtefactNotificationCommand;
        this.verifyNamedEntityCommand = verifyNamedEntityCommand;
    }

    @DgsMutation
    public Story addArtefactToBasket(@InputArgument AddArtefactInput create) {
        return addArtefactToBasketCommand.execute(create.getStoryId(), create.getArtefactId());
    }

    @DgsMutation
    public Story deleteArtefactFromBasket(@InputArgument DeleteArtefactFromBasketInput delete) {

        if (!ObjectId.isValid(delete.getStoryId())) {
            throw new IllegalArgumentException("Given story id (" + delete.getStoryId() + ") is not a valid id.");
        }

        if (!ObjectId.isValid(delete.getArtefactId())) {
            throw new IllegalArgumentException("Given artefact id (" + delete.getStoryId() + ") is not a valid id.");
        }

        return deleteArtefactFromBasketCommand.execute(delete.getStoryId(), new ObjectId(delete.getArtefactId()));
    }

    @DgsMutation
    public ObjectId addArtefactToFavourite(
            @InputArgument ArtefactFavouriteInput create, DgsDataFetchingEnvironment env) {
        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        if (!ObjectId.isValid(create.getId()))
            throw new IllegalArgumentException("Given id (" + create.getId() + ") is not a valid id.");

        var id = new ObjectId(create.getId());
        return addArtefactFavouriteCommand.execute(id, user.getId());
    }

    @DgsMutation
    public String deleteArtefactFromFavourite(
            @InputArgument ArtefactFavouriteInput delete, DgsDataFetchingEnvironment env) {
        SpringSecurityContext context = DgsContext.getCustomContext(env);
        var user = (DreipcUser) context.currentUser();

        if (!ObjectId.isValid(delete.getId()))
            throw new IllegalArgumentException("Given id (" + delete.getId() + ") is not a valid id.");

        var id = new ObjectId(delete.getId());

        deleteArtefactFavouriteCommand.execute(id, user.getId());

        return "Object with id " + id + " deleted";
    }

    @DgsMutation
    public ArtefactNotification reportArtefact(@InputArgument ArtefactNotificationInput create) {
        if (!ObjectId.isValid(create.getArtefactId()))
            throw new BadRequestException("Given id (" + create.getArtefactId() + ") is not a valid id.");

        var artefactId = create.getArtefactId();
        String message = create.getMessage();

        return createArtefactNotificationCommand.execute(artefactId, message);
    }

    @DgsMutation
    public ArtefactNotification updateArtefactNotification(@InputArgument UpdateArtefactNotificationInput update) {
        if (!ObjectId.isValid(update.getId()))
            throw new BadRequestException("Given id (" + update.getId() + ") is not a valid id.");

        var notificationId = new ObjectId(update.getId());
        var isRead = update.getIsRead();

        return updateArtefactNotificationCommand.execute(notificationId, isRead);
    }

    @DgsMutation
    public String deleteArtefactNotification(@InputArgument DeleteArtefactNotificationInput delete) {
        if (!ObjectId.isValid(delete.getId()))
            throw new BadRequestException("Given id (" + delete.getId() + ") is not a valid id.");

        var notificationId = new ObjectId(delete.getId());

        return deleteArtefactNotificationCommand.execute(notificationId);
    }

    @DgsMutation
    public NamedEntity verifyEntity(VerifyEntityInput where) {
        if (!ObjectId.isValid(where.getArtefactId()))
            throw new BadRequestException("Given id (" + where.getArtefactId() + ") is not a valid id.");

        var id = new NamedEntityId();
        id.setArtefactId(new ObjectId(where.getArtefactId()));
        id.setProperty(where.getArtefactProperty());
        id.setStartPosition(where.getEntityStartPosition());
        id.setEndPosition(where.getEntityEndPosition());

        var language = new Locale(where.getLanguage().name());

        return verifyNamedEntityCommand.execute(id, language, where.getIsCorrect());
    }
}
