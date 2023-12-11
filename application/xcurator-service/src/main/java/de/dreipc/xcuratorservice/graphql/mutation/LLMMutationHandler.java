package de.dreipc.xcuratorservice.graphql.mutation;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import de.dreipc.xcuratorservice.data.llm.LLM;
import de.dreipc.xcuratorservice.data.llm.LLMTemplate;
import de.dreipc.xcuratorservice.data.llm.LLMTemplateRepository;
import dreipc.graphql.types.LLMTemplateInput;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
@DgsComponent
public class LLMMutationHandler {

    private final LLMTemplateRepository repository;

    private MongoTemplate mongoTemplate;

    public LLMMutationHandler(LLMTemplateRepository repository, MongoTemplate mongoTemplate) {
        this.repository = repository;
        this.mongoTemplate = mongoTemplate;
    }

    @DgsMutation
    public dreipc.graphql.types.LLMTemplate setStoryModulThoughtPrompt(@InputArgument LLMTemplateInput where) {

        if (where.getSystemTemplate().isBlank() || where.getUserTemplate().isBlank())
            throw new IllegalArgumentException(
                    "Empty input is not allowed! please add some input on user AND system template.");

        if (!where.getSystemTemplate().contains("<USER_INPUT>")
                || !where.getUserTemplate().contains("<USER_INPUT>"))
            throw new IllegalArgumentException(
                    "Required <USER_INPUT> tag not found. PLease add inside your definition.");

        var template = LLMTemplate.builder()
                .id(LLM.MODUL_THOUGHT)
                .userTemplate(where.getUserTemplate())
                .systemTemplate(where.getSystemTemplate())
                .build();

        if (!template.noDataInjectionRequired())
            throw new IllegalArgumentException("No data injection is set. Please add a " + LLMTemplate.dataMarker
                    + " into your template to mark a part to be replaced by data.");
        if (!template.noLanguageInjectionRequired())
            throw new IllegalArgumentException("No language injection is set. Please add a "
                    + LLMTemplate.languageMarker + " into your template to mark a part to be replaced by language.");

        var selector = new Query(Criteria.where("_id").is(LLM.MODUL_THOUGHT));

        var update = new Update();

        update.set("userTemplate", where.getUserTemplate());

        update.set("systemTemplate", where.getSystemTemplate());

        var storedTemplate = mongoTemplate.findAndModify(
                selector, update, new FindAndModifyOptions().returnNew(true), LLMTemplate.class);

        return dreipc.graphql.types.LLMTemplate.newBuilder()
                .userTemplate(storedTemplate.getUserTemplate())
                .systemTemplate(storedTemplate.getSystemTemplate())
                .build();
    }

    @DgsMutation
    public dreipc.graphql.types.LLMTemplate setStoryIntroductionTemplate(@InputArgument LLMTemplateInput where) {

        if (where.getSystemTemplate().isBlank() || where.getUserTemplate().isBlank())
            throw new IllegalArgumentException(
                    "Empty input is not allowed! please add some input on user AND system template.");

        var template = LLMTemplate.builder()
                .id(LLM.INTRODUCTION)
                .userTemplate(where.getUserTemplate())
                .systemTemplate(where.getSystemTemplate())
                .build();

        if (!template.noDataInjectionRequired())
            throw new IllegalArgumentException("No data injection is set. Please add a " + LLMTemplate.dataMarker
                    + " into your template to mark a part to be replaced by data.");
        if (!template.noLanguageInjectionRequired())
            throw new IllegalArgumentException("No language injection is set. Please add a "
                    + LLMTemplate.languageMarker + " into your template to mark a part to be replaced by language.");

        var selector = new Query(Criteria.where("_id").is(LLM.INTRODUCTION));

        var update = new Update();

        update.set("userTemplate", where.getUserTemplate());

        update.set("systemTemplate", where.getSystemTemplate());

        var storedTemplate = mongoTemplate.findAndModify(
                selector, update, new FindAndModifyOptions().returnNew(true), LLMTemplate.class);

        return dreipc.graphql.types.LLMTemplate.newBuilder()
                .userTemplate(storedTemplate.getUserTemplate())
                .systemTemplate(storedTemplate.getSystemTemplate())
                .build();
    }

    @DgsMutation
    public dreipc.graphql.types.LLMTemplate setStoryConclusionTemplate(@InputArgument LLMTemplateInput where) {

        if (where.getSystemTemplate().isBlank() || where.getUserTemplate().isBlank())
            throw new IllegalArgumentException(
                    "Empty input is not allowed! please add some input on user AND system template.");

        var template = LLMTemplate.builder()
                .id(LLM.CONCLUSION)
                .userTemplate(where.getUserTemplate())
                .systemTemplate(where.getSystemTemplate())
                .build();

        if (!template.noDataInjectionRequired())
            throw new IllegalArgumentException("No data injection is set. Please add a " + LLMTemplate.dataMarker
                    + " into your template to mark a part to be replaced by data.");
        if (!template.noLanguageInjectionRequired())
            throw new IllegalArgumentException("No language injection is set. Please add a "
                    + LLMTemplate.languageMarker + " into your template to mark a part to be replaced by language.");

        var selector = new Query(Criteria.where("_id").is(LLM.CONCLUSION));

        var update = new Update();

        update.set("userTemplate", where.getUserTemplate());

        update.set("systemTemplate", where.getSystemTemplate());

        var storedTemplate = mongoTemplate.findAndModify(
                selector, update, new FindAndModifyOptions().returnNew(true), LLMTemplate.class);

        return dreipc.graphql.types.LLMTemplate.newBuilder()
                .userTemplate(storedTemplate.getUserTemplate())
                .systemTemplate(storedTemplate.getSystemTemplate())
                .build();
    }
}
