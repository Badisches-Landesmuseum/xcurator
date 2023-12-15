package de.dreipc.xcuratorservice.service.wikipedia;

import de.dreipc.xcuratorservice.data.wiki.WikiPediaBaseEntity;
import de.dreipc.xcuratorservice.service.wikipedia.fetchers.WikipediaBaseEntityFetcher;
import dreipc.common.graphql.exception.NotFoundException;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WikiPedia {

    private static final String DEFAULT_LANGUAGE = "de";
    private static final WikiPediaAPI API = new WikiPediaAPI();

    public WikiPediaBaseEntity entity(String title) {
        return entity(title, DEFAULT_LANGUAGE);
    }

    public WikiPediaBaseEntity entity(String title, String language) throws NotFoundException {

        if (title.isEmpty()) throw new IllegalArgumentException("Title (" + title + ") is not valid");

        var response = API.requestQuery(title, language);
        return WikipediaBaseEntityFetcher.convert(response, title);
    }

    public List<WikiPediaBaseEntity> entities(List<String> titles) {
        return entities(titles, DEFAULT_LANGUAGE);
    }

    @Cacheable("wikipedia")
    public List<WikiPediaBaseEntity> entities(List<String> titles, String language) {
        var responseArray =
                titles.stream().map(title -> entity(title, language)).toList();
        return responseArray;
    }
}
