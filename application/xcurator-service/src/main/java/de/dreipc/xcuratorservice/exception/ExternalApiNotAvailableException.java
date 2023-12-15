package de.dreipc.xcuratorservice.exception;

public class ExternalApiNotAvailableException extends RuntimeException {
    public ExternalApiNotAvailableException(String elementNotFound) {
        super(elementNotFound);
    }
}
