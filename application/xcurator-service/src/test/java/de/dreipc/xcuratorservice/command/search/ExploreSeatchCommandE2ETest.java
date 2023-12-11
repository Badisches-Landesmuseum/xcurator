package de.dreipc.xcuratorservice.command.search;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSearchInput;
import de.dreipc.xcuratorservice.data.explorer.domain.ExploreSearchResult;
import de.dreipc.xcuratorservice.data.explorer.domain.StorySearchInput;
import de.dreipc.xcuratorservice.testutil.*;
import org.bson.types.ObjectId;
import org.elasticsearch.client.RestClient;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.session.SessionRepository;

import java.util.Locale;

import static org.junit.jupiter.api.Assertions.*;

// properties = "clip-http.url=http://localhost:8080/text/embedding"
@SpringBootTest
@Import(TestcontainersInitializer.class)
@EnableTestcontainers(mongo = true, elastic = true, clip = true)
@MockBean(SessionRepository.class)
class ExploreSeatchCommandE2ETest {

    @Autowired
    ExploreSearchCommand exploreSearchCommand;

    @BeforeAll
    static void setUp(@Autowired RestClient restClient, @Autowired MongoTemplate template)
            throws JsonProcessingException {
        var initalizer = new xCuratorMongoInitializer(template);
        initalizer.insert("xcurator.artefact.json", Artefact.class);

        var initializer = new xCuratorElasticsearchInitializer(restClient);
        initializer.init(initializer.ARTEFACT_INDEX, "elastic-mapping.json", "xcurator.artefact.json");
        initializer.init(initializer.Story_INDEX, "elastic-story-mapping.json", "xcurator.story.json");
    }

    @BeforeEach
    void setUp() {}

    @Test
    void empty() {
        var artefactInput =
                ArtefactSearchInput.builder().language(Locale.GERMAN).build();
        var storyInput = StorySearchInput.builder().language(Locale.GERMAN).build();
        var result = exploreSearchCommand.execute(artefactInput, storyInput, 300);
        assertEquals(5, result.getFacettes().size());
        contains("65267c44074b1c6b907b1099", result);

        result.getItems()
                .forEach(item ->
                        System.out.println(item.id() + "[" + item.objectClass().getSimpleName() + "] " + item.score()));
    }

    @Test
    void text_search() {
        var artefactInput = ArtefactSearchInput.builder()
                .language(Locale.GERMAN)
                .queryString("schmuck")
                .build();
        var storyInput = StorySearchInput.builder()
                .language(Locale.GERMAN)
                .queryString("schmuck")
                .maxCount(10)
                .build();
        var result = exploreSearchCommand.execute(artefactInput, storyInput, 10);
        assertEquals(5, result.getFacettes().size());
        assertEquals(7, result.getItems().size());
        contains("65267c44074b1c6b907b1099", result);

        result.getItems()
                .forEach(item ->
                        System.out.println(item.id() + "[" + item.objectClass().getSimpleName() + "] " + item.score()));
    }

    @Test
    void text_search_facetted_material() {
        var input = ArtefactSearchInput.builder()
                .language(Locale.GERMAN)
                .queryString("schmuck")
                .material("Bronze") // 2
                .material("Jade") // 4
                .build();
        var storyInput = StorySearchInput.builder()
                .queryString("schmuck")
                .language(Locale.GERMAN)
                .maxCount(10)
                .build();
        var result = exploreSearchCommand.execute(input, storyInput, 10);
        assertEquals(5, result.getFacettes().size());
        assertEquals(7, result.getItems().size());
        contains("65267c44074b1c6b907b1099", result);

        result.getItems()
                .forEach(item ->
                        System.out.println(item.id() + "[" + item.objectClass().getSimpleName() + "] " + item.score()));
    }

    @Test
    void text_search_facetted_location() {
        var input = ArtefactSearchInput.builder()
                .language(Locale.GERMAN)
                .queryString("schmuck")
                .country("CN") // 4
                .build();
        var storyInput = StorySearchInput.builder()
                .queryString("schmuck")
                .language(Locale.GERMAN)
                .maxCount(10)
                .build();
        var result = exploreSearchCommand.execute(input, storyInput, 10);
        assertEquals(5, result.getFacettes().size());
        assertEquals(5, result.getItems().size());
        contains("65267c44074b1c6b907b1099", result);

        result.getItems()
                .forEach(item ->
                        System.out.println(item.id() + "[" + item.objectClass().getSimpleName() + "] " + item.score()));
    }

    @Test
    void text_search_facetted_color() {
        var input = ArtefactSearchInput.builder()
                .language(Locale.GERMAN)
                .queryString("schmuck")
                .color("GREEN") // 3
                .build();
        var storyInput = StorySearchInput.builder()
                .queryString("schmuck")
                .language(Locale.GERMAN)
                .maxCount(10)
                .build();
        var result = exploreSearchCommand.execute(input, storyInput, 10);
        assertEquals(5, result.getFacettes().size());
        assertEquals(4, result.getItems().size());
        contains("65267c44074b1c6b907b1099", result);

        result.getItems()
                .forEach(item ->
                        System.out.println(item.id() + "[" + item.objectClass().getSimpleName() + "] " + item.score()));
    }

    @Test
    void text_search_facetted_epoch() {
        var input = ArtefactSearchInput.builder()
                .language(Locale.GERMAN)
                .queryString("schmuck")
                .epoch("ANTIKE") // 2
                .build();
        var storyInput = StorySearchInput.builder()
                .queryString("schmuck")
                .language(Locale.GERMAN)
                .maxCount(10)
                .build();
        var result = exploreSearchCommand.execute(input, storyInput, 10);
        assertEquals(5, result.getFacettes().size());
        assertEquals(3, result.getItems().size());
        contains("65267c44074b1c6b907b1099", result);

        result.getItems()
                .forEach(item ->
                        System.out.println(item.id() + "[" + item.objectClass().getSimpleName() + "] " + item.score()));
    }

    @Test
    void text_search_facetted_owner() {
        var input = ArtefactSearchInput.builder()
                .language(Locale.GERMAN)
                .queryString("schmuck")
                .owner("Badisches Landesmuseum") // 6 ?!
                .build();
        var storyInput = StorySearchInput.builder()
                .queryString("schmuck")
                .language(Locale.GERMAN)
                .maxCount(10)
                .build();
        var result = exploreSearchCommand.execute(input, storyInput, 10);
        assertEquals(5, result.getFacettes().size());
        assertEquals(7, result.getItems().size());
        contains("65267c44074b1c6b907b1099", result);

        result.getItems()
                .forEach(item ->
                        System.out.println(item.id() + "[" + item.objectClass().getSimpleName() + "] " + item.score()));
    }

    @AfterAll
    static void tearDown(@Autowired ArtefactRepository artefactRepository) {
        artefactRepository.deleteAll();
    }

    private boolean contains(String id, ExploreSearchResult result) {
        var givenId = new ObjectId(id);
        for (var item : result.getItems()) if (item.id().equals(givenId)) return true;
        return false;
    }
}
