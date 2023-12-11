package de.dreipc.xcuratorservice.service.wikidata;

import de.dreipc.xcuratorservice.data.wiki.WikiDataBaseEntity;
import de.dreipc.xcuratorservice.service.wikidata.fetchers.BaseEntityFetcher;
import de.dreipc.xcuratorservice.service.wikidata.fetchers.NameFetcher;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class WikiData {

    private static final String DEFAULT_LANGUAGE = "de";
    private static final WikiDataAPI API = new WikiDataAPI();

    private boolean isNotAWikiId(String id) {
        return !id.startsWith("Q");
    }

    public String name(String id) {
        if (isNotAWikiId(id)) throw new IllegalArgumentException("Id (" + id + ") is not a valid Wiki Id.");
        return names(List.of(id)).get(0);
    }

    public List<String> names(List<String> ids) {
        if (ids.isEmpty()) return Collections.emptyList();

        var nameFetcher = new NameFetcher();

        var distinctIds = ids.stream().distinct().toList();
        var query = nameFetcher.query(distinctIds, DEFAULT_LANGUAGE);
        var results = API.requestQuery(query);
        var qidToName = nameFetcher.convert(results);

        return ids.stream().map(qidToName::get).toList();
    }

    public WikiDataBaseEntity entity(String id) {
        return entity(id, DEFAULT_LANGUAGE);
    }

    public WikiDataBaseEntity entity(String id, String language) {
        if (isNotAWikiId(id)) throw new IllegalArgumentException("Id (" + id + ") is not a valid Wiki Id.");
        return entities(List.of(id), language).get(0);
    }

    public List<WikiDataBaseEntity> entities(List<String> ids) {
        return entities(ids, DEFAULT_LANGUAGE);
    }

    @Cacheable("wikidata")
    public List<WikiDataBaseEntity> entities(List<String> ids, String language) {
        var entityFetcher = new BaseEntityFetcher();
        var query = entityFetcher.query(ids, language);
        var results = API.requestQuery(query);
        return entityFetcher.convert(results);
    }
}
