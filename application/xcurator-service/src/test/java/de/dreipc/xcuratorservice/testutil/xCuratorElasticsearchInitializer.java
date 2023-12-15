package de.dreipc.xcuratorservice.testutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.RestClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public class xCuratorElasticsearchInitializer {

    private final RestClient restClient;
    private final ObjectMapper mapper = new ObjectMapper();
    public final String ARTEFACT_INDEX = "xcurator.artefact";
    public final String Story_INDEX = "xcurator.story";

    public xCuratorElasticsearchInitializer(RestClient restClient) {
        this.restClient = restClient;
    }

    public void init(String index, String artefactMapping, String artefactData) {
        try {
            createArtefactIndex(index, artefactMapping, artefactData);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public int count(String indexName) throws IOException {
        var countResponse = restClient.performRequest(new Request("GET", "/" + indexName + "/_count"));
        var jsonBody = mapper.readTree(countResponse.getEntity().getContent());
        return jsonBody.get("count").asInt();
    }

    private void createArtefactIndex(String indexName, String mappingFile, String dataFile) throws IOException {
        var mapping = getResourceFileAsString(mappingFile);
        var mappingRequest = new Request("PUT", "/" + indexName);
        mappingRequest.setJsonEntity(mapping);
        restClient.performRequest(mappingRequest);

        var dataBulk = createBulk(indexName, dataFile);
        var bulkRequest = new Request("POST", "/" + indexName + "/_bulk?refresh=wait_for");
        bulkRequest.setJsonEntity(dataBulk);
        var response = restClient.performRequest(bulkRequest);
        var json = mapper.readTree(response.getEntity().getContent());
        var bla = "blubb";
    }

    private String createBulk(String indexName, String mongoDataFileName) throws JsonProcessingException {
        var mapping = getResourceFileAsString(mongoDataFileName);
        JsonNode jsonNode = mapper.readTree(mapping);
        StringBuilder dataBulk = new StringBuilder();

        jsonNode.elements().forEachRemaining(node -> {
            var id = node.get("_id").get("$oid");
            ((ObjectNode) node).remove("_id");

            var metaContent = mapper.createObjectNode();
            metaContent.put("_index", indexName);
            metaContent.set("_id", id);
            var metaNode = mapper.createObjectNode();
            metaNode.set("index", metaContent);
            try {
                dataBulk.append(mapper.writeValueAsString(metaNode)).append("\n");
                dataBulk.append(mapper.writeValueAsString(node)).append("\n");
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });

        // check modules.artefactId's for stories -> should be string instead of object $oid

        return dataBulk.toString();
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
        ClassLoader classLoader = xCuratorElasticsearchInitializer.class.getClassLoader();
        return classLoader.getResourceAsStream(fileName);
    }
}
