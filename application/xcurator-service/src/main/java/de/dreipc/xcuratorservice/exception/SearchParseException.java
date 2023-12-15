package de.dreipc.xcuratorservice.exception;

public class SearchParseException extends RuntimeException {
    public SearchParseException(String elementNotFound) {
        super(elementNotFound);
    }
}
