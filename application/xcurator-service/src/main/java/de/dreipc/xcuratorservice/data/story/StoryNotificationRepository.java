package de.dreipc.xcuratorservice.data.story;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StoryNotificationRepository extends MongoRepository<StoryNotification, String> {}
