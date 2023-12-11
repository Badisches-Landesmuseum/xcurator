package de.dreipc.xcuratorservice.exception;

public class MissingTranslationException extends RuntimeException {
    public MissingTranslationException(String elementNotFound) {
        super(elementNotFound);
    }
}
