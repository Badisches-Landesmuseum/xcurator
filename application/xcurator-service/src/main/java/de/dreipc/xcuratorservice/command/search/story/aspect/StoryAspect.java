package de.dreipc.xcuratorservice.command.search.story.aspect;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotNull;

import java.util.Optional;

public interface StoryAspect<T> {
    Optional<JsonNode> query(@NotNull T input);
}
