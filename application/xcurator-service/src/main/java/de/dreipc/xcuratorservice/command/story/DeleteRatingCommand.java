package de.dreipc.xcuratorservice.command.story;

import de.dreipc.xcuratorservice.data.story.RatingRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DeleteRatingCommand {

    private final RatingRepository repository;

    public DeleteRatingCommand(RatingRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void execute(ObjectId id) {
        repository.findById(id).ifPresent(rating -> {
            rating.setDeleted(true);
            repository.save(rating);
        });
    }

    public void execute(List<ObjectId> ids) {
        ids.forEach(this::execute);
    }
}
