package de.dreipc.xcuratorservice.testutil;

import com.redis.testcontainers.RedisContainer;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.springframework.context.annotation.Configuration;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.utility.DockerImageName;

/**
 * Test Container initializer, to build a Singleton container configuration including all spring property configuration.
 * ATTENTION: Please make sure you set @DataMongoTest for initializing the Repositories Properly
 * <p>
 * To use this Initializer, add the €EnableTestcontainers Annotation on your test-class
 * <p>
 * Autor: Sören Räuchle
 */
@Slf4j
@Configuration
@SuppressWarnings("unchecked")
public class TestcontainersInitializer implements BeforeAllCallback {

    private static final MongoDBContainer mongodb = new MongoDBContainer(DockerImageName.parse("mongo:6.0.1"))
            .withEnv("MONGODB_DATABASE", "test-database")
            .withEnv("MONGODB_REPLICA_SET_MODE", "primary")
            .withEnv("MONGODB_REPLICA_SET_NAME", "rs0")
            .withEnv("MONGODB_REPLICA_SET_KEY", "test-replicaKey123")
            .withEnv("MONGO_INITDB_DATABASE", "test-database")
            .withReuse(true)
            .withLogConsumer(logging -> log.debug(logging.getUtf8StringWithoutLineEnding()));

    private static final ElasticsearchContainer elastic = new ElasticsearchContainer(
                    DockerImageName.parse("nexus.3pc.de/infrastructure/elastic-search:8.8.0-3pc-1.2.0")
                            .asCompatibleSubstituteFor("docker.elastic.co/elasticsearch/elasticsearch"))
            .withEnv("discovery.type", "single-node")
            .withEnv("xpack.security.enabled", "false")
            .withEnv("ES_JAVA_OPTS", "-Xms512m -Xmx512m")
            .withEnv("bootstrap.memory_lock", "true")
            .withReuse(true)
            .withLogConsumer(logging -> log.debug(logging.getUtf8StringWithoutLineEnding()));

    private static final GenericContainer<?> clipHttpService = new GenericContainer(
                    DockerImageName.parse("nexus.3pc.de/temp/xcurator/clip-http-service-develop:0.0.1-dev.24"))
            .withExposedPorts(8080)
            .withReuse(true);

    private static final RedisContainer redis = new RedisContainer(DockerImageName.parse("bitnami/redis:7.0.5"))
            .withEnv("REDIS_PASSWORD", "test-password")
            .withReuse(true)
            .withExposedPorts(6333);

    @Override
    public void beforeAll(ExtensionContext context) {
        if (context.getElement().isEmpty()) return;

        var annotation = context.getElement().get().getAnnotation(EnableTestcontainers.class);

        if (annotation.mongo()) startAndConfigMongoDB();
        if (annotation.elastic()) startAndConfigElasticsearch();
        if (annotation.redis()) startAndConfigRedis();
        if (annotation.clip()) startClipHttpService();
    }

    private void startAndConfigMongoDB() {
        mongodb.start();
        var mongoUri =
                String.format("mongodb://%s:%d/%s", mongodb.getHost(), mongodb.getFirstMappedPort(), "test-database");
        System.setProperty("spring.data.mongodb.uri", mongoUri);
        System.setProperty("spring.test.database.replace", "none");
    }

    private void startAndConfigElasticsearch() {
        elastic.start();
        var elasticUri = String.format("%s:%s", elastic.getHost(), elastic.getFirstMappedPort());
        System.setProperty("spring.elasticsearch.uris", elasticUri);
    }

    private void startAndConfigRedis() {
        redis.start();
        System.setProperty("spring.data.redis.host", redis.getHost());
        System.setProperty("spring.data.redis.port", String.valueOf(redis.getFirstMappedPort()));
        System.setProperty("spring.data.redis.password", "test-password");
        System.setProperty("spring.data.redis.namespace", "sess");
    }

    private void startClipHttpService() {
        clipHttpService.start();
        var clipUrl = String.format(
                "http://%s:%s/text/embedding", clipHttpService.getHost(), clipHttpService.getFirstMappedPort());
        System.setProperty("clip-http.url", clipUrl);
    }
}
