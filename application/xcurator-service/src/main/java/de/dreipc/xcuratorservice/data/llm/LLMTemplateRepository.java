package de.dreipc.xcuratorservice.data.llm;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LLMTemplateRepository extends MongoRepository<LLMTemplate, LLM> {}
