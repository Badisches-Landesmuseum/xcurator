package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
public class UnpublishStoryCommand {

    private final StoryRepository storyRepository;

    public UnpublishStoryCommand(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    public Story execute(ObjectId storyId) {
        var story = (Story) storyRepository
                .findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("Story with id " + storyId + " not found"));

        story.setIsPublished(false);

        storyRepository.save(story);

        return story;
    }
}
