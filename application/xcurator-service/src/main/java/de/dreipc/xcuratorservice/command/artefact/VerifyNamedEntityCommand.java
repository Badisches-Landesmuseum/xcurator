package de.dreipc.xcuratorservice.command.artefact;

import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.artefact.NamedEntity;
import de.dreipc.xcuratorservice.data.entity.NamedEntityId;
import de.dreipc.xcuratorservice.data.entity.VerifiedNamedEntity;
import de.dreipc.xcuratorservice.data.entity.VerifiedNamedEntityRepository;
import dreipc.common.graphql.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class VerifyNamedEntityCommand {

    private final VerifiedNamedEntityRepository repository;
    private final ArtefactRepository artefactRepository;

    public VerifyNamedEntityCommand(VerifiedNamedEntityRepository repository, ArtefactRepository artefactRepository) {
        this.repository = repository;
        this.artefactRepository = artefactRepository;
    }

    public NamedEntity execute(NamedEntityId id, Locale language, boolean isCorrect) {
        var artefact = artefactRepository
                .findById(id.getArtefactId())
                .orElseThrow(() -> new NotFoundException("Artefact with id (" + id.getArtefactId() + ") not exist."));

        var givenEntities = artefact.getEntities().get(language).stream()
                .filter(elem -> elem.getProperty().equals(id.getProperty()))
                .filter(elem -> elem.getStartPosition() == id.getStartPosition())
                .filter(elem -> elem.getEndPosition() == id.getEndPosition())
                .toList();

        if (givenEntities.isEmpty()) throw new NotFoundException("Given Entity is not found");

        var entity = givenEntities.get(0);
        var link = entity.getLinkedData().get("wikidata") != null
                ? entity.getLinkedData().get("wikidata")
                : entity.getLinkedData().get("wikipedia");

        var verifiedEntity = VerifiedNamedEntity.builder()
                .id(id)
                .type(entity.getType())
                .literal(entity.getLiteral())
                .isCorrect(isCorrect)
                .linkId(link.getId())
                .build();

        repository.save(verifiedEntity);
        return entity;
    }
}
