package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DeleteStoryCommand {

    private final StoryRepository storyRepository;

    private final DeleteRatingCommand deleteRatingCommand;

    public DeleteStoryCommand(StoryRepository storyRepository, DeleteRatingCommand deleteRatingCommand) {
        this.storyRepository = storyRepository;
        this.deleteRatingCommand = deleteRatingCommand;
    }

    @Transactional
    public String execute(ObjectId id) {
        var story = (Story) storyRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Story with id " + id + " not found"));

        story.setIsDeleted(true);

        var ratingIds = story.getRatingIds();

        if (ratingIds != null && !ratingIds.isEmpty()) {
            deleteRatingCommand.execute(ratingIds);
        }

        storyRepository.save(story);

        return "Story with id " + id + " deleted";
    }
}
