package de.dreipc.xcuratorservice.data.artefact;

import org.bson.types.ObjectId;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ArtefactRepositoryCustom {

    Map<ObjectId, List<Float>> findAllEmbeddingByIds(Set<ObjectId> artefactIds);
}
