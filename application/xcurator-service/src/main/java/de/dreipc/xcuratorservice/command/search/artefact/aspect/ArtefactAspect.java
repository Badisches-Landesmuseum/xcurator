package de.dreipc.xcuratorservice.command.search.artefact.aspect;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotNull;

import java.util.Optional;

public interface ArtefactAspect<T> {
    Optional<JsonNode> query(@NotNull T input);

    Optional<JsonNode> facette();

    Optional<JsonNode> boost(@NotNull T input, float weight);
}
