package de.dreipc.xcuratorservice.service.llm;

import org.bson.types.ObjectId;

import java.util.List;

public interface TextGenerator {

    String generateThought(ObjectId storyId, List<ObjectId> artefactIds, String userInput);

    String generateConclusion(ObjectId storyId);

    String generateIntro(ObjectId storyId);
}
