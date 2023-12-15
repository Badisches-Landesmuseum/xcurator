package de.dreipc.xcuratorservice.service.vector;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public interface VectorService {
    /**
     * Converts a text string into a vector of floats
     *
     * @param text, input text (example="hello world")
     * @return vector representation as list of floats
     */
    @NotNull
    List<Float> toVector(String text);
}
