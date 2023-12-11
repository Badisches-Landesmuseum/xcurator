package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.DgsDataLoader;
import com.netflix.graphql.dgs.DgsQueryExecutor;
import de.dreipc.xcuratorservice.GeneratedTestData;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.profile.UserProfileRepository;
import de.dreipc.xcuratorservice.testutil.EnableTestcontainers;
import de.dreipc.xcuratorservice.testutil.GraphQlTest;
import de.dreipc.xcuratorservice.testutil.WithDreipcUser;
import graphql.ExecutionResult;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@GraphQlTest
@DataMongoTest(
        includeFilters = {
            @ComponentScan.Filter(
                    type = FilterType.ASSIGNABLE_TYPE,
                    value = {ProfileQueryHandler.class}),
            @ComponentScan.Filter(
                    type = FilterType.ANNOTATION,
                    classes = {DgsDataLoader.class})
        })
@EnableTestcontainers(mongo = true)
class ProfileQueryHandlerE2ETest {

    @Autowired
    DgsQueryExecutor dgsExecutor;

    @BeforeEach
    void setUp(@Autowired UserProfileRepository repository, @Autowired ArtefactRepository artefactRepository) {
        repository.insert(GeneratedTestData.GERMAN_PROFILE);
        artefactRepository.insert(GeneratedTestData.ARTEFACTS);
    }

    @AfterEach
    void tearDown(@Autowired UserProfileRepository repository, @Autowired ArtefactRepository artefactRepository) {
        repository.deleteAll();
        artefactRepository.deleteAll();
    }

    @Test
    @WithDreipcUser(id = GeneratedTestData.USER_ID)
    void myFavouritesWorksIfIHaveAUser() {
        List<String> titles =
                dgsExecutor.executeAndExtractJsonPath("{ myFavourites { id title }}", "data.myFavourites[*].title");

        assertThat(titles).isNotEmpty();
    }

    @Test
    void myFavouritesDoesNotWorkIfDontIHaveAUser() {
        ExecutionResult result = dgsExecutor.execute("{ myFavourites { id title }}");

        assertThat(result.getErrors()).isNotEmpty();
        assertThat(result.getErrors().get(0).getMessage()).contains("Permission denied");
    }
}
