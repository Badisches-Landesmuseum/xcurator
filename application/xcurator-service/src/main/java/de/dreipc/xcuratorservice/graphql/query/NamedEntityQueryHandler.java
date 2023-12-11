package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import de.dreipc.xcuratorservice.graphql.UserIdLanguageLocalContext;
import de.dreipc.xcuratorservice.service.wikidata.WikiData;
import de.dreipc.xcuratorservice.service.wikipedia.WikiPedia;
import dreipc.common.graphql.exception.NotFoundException;
import dreipc.graphql.types.NamedEntityDetail;
import dreipc.graphql.types.NamedEntityDetailInput;
import graphql.execution.DataFetcherResult;

import java.util.Locale;

@DgsComponent
public class NamedEntityQueryHandler {

    private final WikiData wikidata;
    private final WikiPedia wikiPedia;

    public NamedEntityQueryHandler(WikiData wikidata, WikiPedia wikiPedia) {
        this.wikidata = wikidata;
        this.wikiPedia = wikiPedia;
    }

    @DgsQuery
    public DataFetcherResult<NamedEntityDetail> entitiesDetail(@InputArgument NamedEntityDetailInput where) {
        if (!where.getWikidataId().startsWith("Q"))
            throw new IllegalArgumentException("Given id (" + where.getWikidataId() + ") is not a valid Wikidata id.");

        var language = where.getLanguage().name().toLowerCase();

        var dataElem = wikidata.entity(where.getWikidataId(), language);
        String description;
        try {
            var wikiElem = wikiPedia.entity(where.getWikipediaId(), language);
            description = wikiElem.getDescription();
        } catch (NotFoundException e) {
            description = dataElem.getDescription();
        }

        var detail = NamedEntityDetail.newBuilder()
                .description(description)
                .title(dataElem.getName())
                .image(dataElem.getImageUrl())
                .build();

        UserIdLanguageLocalContext localContext = new UserIdLanguageLocalContext(null, new Locale(language));

        return DataFetcherResult.<NamedEntityDetail>newResult()
                .data(detail)
                .localContext(localContext)
                .build();
    }
}
