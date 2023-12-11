package de.dreipc.xcuratorservice.testutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class xCuratorMongoInitializer {

    private final MongoTemplate mongoTemplate;
    private final ObjectMapper mapper = new ObjectMapper();

    public xCuratorMongoInitializer(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        mapper.registerModule(new JavaTimeModule());
        SimpleModule mongoModule = new SimpleModule("ObjectId", new Version(1, 0, 0, null, null, null));
        mongoModule.addDeserializer(ObjectId.class, new ObjectIdDeserializer());
        mapper.registerModule(mongoModule);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public <T> void insert(String artefactData, Class<T> type) throws JsonProcessingException {
        var jsonString = getResourceFileAsString(artefactData);

        ArrayNode json = (ArrayNode) mapper.readTree(jsonString);
        StreamSupport.stream(json.spliterator(), false).forEach(node -> {
            var objectNode = ((ObjectNode) node);
            objectNode.put("__typename", type.getSimpleName());
            var id = objectNode.get("_id");
            objectNode.set("id", id);
            objectNode.remove("_id");

            if (objectNode.has("modules")) {
                StreamSupport.stream(objectNode.get("modules").spliterator(), false)
                        .forEach(moduleNode -> {
                            var moduleId = moduleNode.get("_id");
                            ((ObjectNode) moduleNode).set("id", moduleId);
                            ((ObjectNode) moduleNode).remove("_id");
                        });
            }
        });

        List<T> elements = mapper.readValue(
                json.toPrettyString(), mapper.getTypeFactory().constructCollectionType(List.class, type));
        mongoTemplate.insert(elements, type);
    }

    private static String getResourceFileAsString(String fileName) {
        InputStream is = getResourceFileAsInputStream(fileName);
        if (is != null) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        } else {
            throw new RuntimeException("resource not found");
        }
    }

    private static InputStream getResourceFileAsInputStream(String fileName) {
        ClassLoader classLoader = xCuratorMongoInitializer.class.getClassLoader();
        return classLoader.getResourceAsStream(fileName);
    }
}
