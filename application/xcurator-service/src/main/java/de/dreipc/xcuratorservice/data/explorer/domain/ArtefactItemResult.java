package de.dreipc.xcuratorservice.data.explorer.domain;

import org.bson.types.ObjectId;

public record ArtefactItemResult(ObjectId id, float[] embedding, float score) {}
