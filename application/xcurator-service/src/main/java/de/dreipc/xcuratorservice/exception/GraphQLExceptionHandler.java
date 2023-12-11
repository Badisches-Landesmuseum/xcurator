package de.dreipc.xcuratorservice.exception;

import com.netflix.graphql.types.errors.ErrorType;
import com.netflix.graphql.types.errors.TypedGraphQLError;
import graphql.GraphQLError;
import graphql.execution.DataFetcherExceptionHandler;
import graphql.execution.DataFetcherExceptionHandlerParameters;
import graphql.execution.DataFetcherExceptionHandlerResult;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Component
public class GraphQLExceptionHandler implements DataFetcherExceptionHandler {

    @Override
    public CompletableFuture<DataFetcherExceptionHandlerResult> handleException(
            DataFetcherExceptionHandlerParameters handlerParameters) {
        if (handlerParameters.getException() instanceof MissingTranslationException) {
            Map<String, Object> debugInfo = new HashMap<>();

            debugInfo.put(
                    "language", handlerParameters.getDataFetchingEnvironment().getLocalContext());

            GraphQLError graphqlError = TypedGraphQLError.newInternalErrorBuilder()
                    .message(handlerParameters.getException().getCause().getMessage())
                    .debugInfo(debugInfo)
                    .path(handlerParameters.getPath())
                    .errorType(ErrorType.NOT_FOUND)
                    .build();

            DataFetcherExceptionHandlerResult result = DataFetcherExceptionHandlerResult.newResult()
                    .error(graphqlError)
                    .build();

            return CompletableFuture.completedFuture(result);
        } else if (handlerParameters.getException() instanceof AccessDeniedException) {
            Map<String, Object> debugInfo = new HashMap<>();

            GraphQLError graphqlError = TypedGraphQLError.newInternalErrorBuilder()
                    .message("You are not permitted to request this resource.")
                    .debugInfo(debugInfo)
                    .path(handlerParameters.getPath())
                    .errorType(ErrorType.PERMISSION_DENIED)
                    .build();

            DataFetcherExceptionHandlerResult result = DataFetcherExceptionHandlerResult.newResult()
                    .error(graphqlError)
                    .build();
            return CompletableFuture.completedFuture(result);
        } else {
            return DataFetcherExceptionHandler.super.handleException(handlerParameters);
        }
    }
}
