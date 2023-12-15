package de.dreipc.xcuratorservice.command.search.explore;

import de.dreipc.xcuratorservice.command.search.artefact.ArtefactQueryBuilder;
import de.dreipc.xcuratorservice.command.search.artefact.aspect.ArtefactAspect;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSearchInput;
import de.dreipc.xcuratorservice.service.vector.ClipHttpService;
import de.dreipc.xcuratorservice.service.vector.VectorService;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import de.dreipc.xcuratorservice.testutil.xCuratorElasticsearchInitializer;
import org.elasticsearch.client.RestClient;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.elasticsearch.DataElasticsearchTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.context.annotation.ComponentScan.*;
import static org.springframework.context.annotation.FilterType.*;

@DataElasticsearchTest(
        includeFilters = {
            @Filter(
                    type = ASSIGNABLE_TYPE,
                    value = {ArtefactAspect.class, ClipHttpService.class})
        })
// , properties = {"clip-http.url=http://localhost:8088/api/embedding"}
@EnableTestcontainers(elastic = true, clip = true)
class ExploreSearchQueryE2ETest {

    @MockBean
    VectorService clipHttpService;

    private ArtefactQueryBuilder queryBuilder;

    @BeforeAll
    static void setUp(@Autowired RestClient restClient) {
        var vectorService = Mockito.mock(ClipHttpService.class);
        when(vectorService.toVector(any())).thenReturn(Collections.emptyList());
        var initializer = new xCuratorElasticsearchInitializer(restClient);
        initializer.init(initializer.ARTEFACT_INDEX, "elastic-mapping.json", "xcurator.artefact.json");
        initializer.init(initializer.Story_INDEX, "elastic-story-mapping.json", "xcurator.story.json");
    }

    @BeforeEach
    void init(@Autowired List<ArtefactAspect<?>> aspectList) {
        queryBuilder = new ArtefactQueryBuilder(aspectList);
    }

    @Test
    void init() {
        assertNotNull(queryBuilder);
    }

    // ToDo: Check https://discuss.elastic.co/t/different-filter-on-multiple-indexes/195151/2
    // ToDo: Check https://discuss.elastic.co/t/filter-by-field-only-if-the-field-exists/171219
    @Test
    void buildTextQuery() {
        var input = ArtefactSearchInput.builder()
                .queryString("Augustus")
                .language(Locale.GERMAN)
                .owner("Badisches Landesmuseum")
                .build();

        var query = queryBuilder.buildQuery(input, 0);
        assertNotNull(query);
    }
}
