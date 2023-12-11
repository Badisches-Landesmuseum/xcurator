package de.dreipc.xcuratorservice.data.explorer.domain;

import org.bson.types.ObjectId;

public record StoryItemResult(ObjectId id, ObjectId firstArtefactId, float score) {}
