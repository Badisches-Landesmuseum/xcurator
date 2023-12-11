package de.dreipc.xcuratorservice.data.entity;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface VerifiedNamedEntityRepository extends MongoRepository<VerifiedNamedEntity, NamedEntityId> {}
