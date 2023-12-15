package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import dreipc.graphql.types.Language;
import dreipc.graphql.types.LicenceType;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class CreateStoryCommand {

    private final StoryRepository storyRepository;

    public CreateStoryCommand(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @Transactional
    public Story execute(String title, Language language, String artefactId, String userId) {
        var storyId = new ObjectId();
        Story story;

        if (artefactId != null) {
            story = Story.builder()
                    .id(storyId)
                    .title(title)
                    .language(language)
                    .authorId(userId)
                    .artefactBasket(List.of(new ObjectId(artefactId)))
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .isDeleted(false)
                    .isPublished(false)
                    .licence(LicenceType.CC0)
                    .rating(0f)
                    .build();
        } else {
            story = Story.builder()
                    .id(storyId)
                    .title(title)
                    .language(language)
                    .authorId(userId)
                    .artefactBasket(List.of())
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .isDeleted(false)
                    .isPublished(false)
                    .licence(LicenceType.CC0)
                    .rating(0f)
                    .build();
        }

        return storyRepository.insert(story);
    }
}
