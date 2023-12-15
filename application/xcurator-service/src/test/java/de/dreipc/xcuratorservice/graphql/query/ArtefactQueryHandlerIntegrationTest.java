package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.DgsQueryExecutor;
import de.dreipc.xcuratorservice.command.search.SimilarArtefactCommand;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.Image;
import de.dreipc.xcuratorservice.data.artefact.Licence;
import de.dreipc.xcuratorservice.graphql.dataloader.ArtefactDataLoader;
import de.dreipc.xcuratorservice.testutil.GraphQlTest;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.net.URI;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anySet;

@GraphQlTest
@ContextConfiguration(classes = {ArtefactQueryHandler.class})
@MockBean(SimilarArtefactCommand.class)
@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection") // DgsQueryExecutor not found but it is there!
class ArtefactQueryHandlerIntegrationTest {

    @Autowired
    DgsQueryExecutor dgsQueryExecutor;

    @MockBean
    ArtefactDataLoader loader;

    @BeforeEach
    @SuppressWarnings("unchecked")
    void setUp() {
        Mockito.when(loader.load(anySet())).thenAnswer(input -> {
            Set<ObjectId> ids = (Set<ObjectId>) input.getArguments()[0];

            var exampleImage = URI.create("https://example.com/image-1.jpg").toURL();

            var exampleLicence = URI.create("https://creative-commons.com/cc-0").toURL();
            var result = ids.stream().collect(Collectors.toMap(id -> id, id -> Artefact.builder()
                    .id(id)
                    .title(Map.of(Locale.GERMAN, "example artefact"))
                    .image(new Image(exampleImage, new Licence(exampleLicence, "CC0"), null, 200, 200))
                    .build()));
            return CompletableFuture.supplyAsync(() -> result);
        });
    }

    @Test
    void artefact() {
        String title = dgsQueryExecutor.executeAndExtractJsonPath(
                "{ artefact(where: { id: \"64be937b997eef1ad1c93265\" language: DE }){ title }}",
                "data.artefact.title");

        assertThat(title).isEqualTo("example artefact");
    }
}
