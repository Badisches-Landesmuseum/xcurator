package de.dreipc.xcuratorservice.data.explorer.domain;

import org.bson.types.ObjectId;

public record ExploreItemResult(ObjectId id, float[] embedding, float score, Class<?> objectClass) {}
