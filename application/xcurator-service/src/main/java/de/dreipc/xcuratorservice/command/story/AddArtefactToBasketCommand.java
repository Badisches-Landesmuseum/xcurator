package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import dreipc.common.graphql.exception.BadRequestException;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddArtefactToBasketCommand {

    private final StoryRepository repository;

    public AddArtefactToBasketCommand(StoryRepository repository) {
        this.repository = repository;
    }

    public Story execute(String storyId, String artefactId) {
        Story story = repository
                .findById(new ObjectId(storyId))
                .orElseThrow(() -> new IllegalArgumentException("Given id (" + storyId + ") is not a valid id."));

        var oldBasket = story.getArtefactBasket();

        if (!oldBasket.isEmpty()) {
            if (oldBasket.contains(new ObjectId(artefactId)))
                throw new BadRequestException("Artefact already in basket.");
            story.getArtefactBasket().add(new ObjectId(artefactId));
        } else {
            story.setArtefactBasket(List.of(new ObjectId(artefactId)));
        }

        repository.save(story);

        return story;
    }
}
