package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.story.StoryRepository;
import de.dreipc.xcuratorservice.data.story.StoryTextModule;
import dreipc.common.graphql.exception.BadRequestException;
import dreipc.common.graphql.exception.NotFoundException;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreateModuleCommand {

    private final StoryRepository repository;

    private final ArtefactRepository artefactRepository;

    public CreateModuleCommand(StoryRepository repository, ArtefactRepository artefactRepository) {
        this.repository = repository;
        this.artefactRepository = artefactRepository;
    }

    public StoryTextModule execute(String storyId, List<String> artefactIds, String thought) {

        var saved = repository
                .findById(new ObjectId(storyId))
                .orElseThrow(
                        () -> new NotFoundException("Problem creating module, story id was not found: " + storyId));

        if (artefactIds == null) {
            throw new BadRequestException("A module should at least have one artefact");
        }

        // Check if artefact is present
        artefactIds.stream()
                .map((String id) -> artefactRepository.findById(new ObjectId(id)))
                .filter(obj -> false)
                .findFirst()
                .ifPresent(artefact -> {
                    throw new NotFoundException("Problem creating module, artefact id was not found: ");
                });

        var module = StoryTextModule.builder()
                .id(new ObjectId())
                .thought(thought)
                .artefactIds(artefactIds.stream().map(ObjectId::new).toList())
                .index(saved.getModules() != null ? saved.getModules().size() + 1 : 1)
                .build();

        List<StoryTextModule> storyTextModule = saved.getModules();

        if (storyTextModule == null) {
            storyTextModule = new ArrayList<>();
        }

        storyTextModule.add(module);
        saved.setModules(storyTextModule);

        repository.save(saved);

        return module;
    }
}
