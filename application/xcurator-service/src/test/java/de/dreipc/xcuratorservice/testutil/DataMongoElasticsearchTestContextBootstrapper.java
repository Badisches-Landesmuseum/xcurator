package de.dreipc.xcuratorservice.testutil;

import org.springframework.boot.test.autoconfigure.data.elasticsearch.DataElasticsearchTest;
import org.springframework.boot.test.context.SpringBootTestContextBootstrapper;
import org.springframework.test.context.TestContextAnnotationUtils;

public class DataMongoElasticsearchTestContextBootstrapper extends SpringBootTestContextBootstrapper {

    @Override
    protected String[] getProperties(Class<?> testClass) {
        DataElasticsearchTest dataMongoTest =
                TestContextAnnotationUtils.findMergedAnnotation(testClass, DataElasticsearchTest.class);
        return (dataMongoTest != null) ? dataMongoTest.properties() : null;
    }
}
