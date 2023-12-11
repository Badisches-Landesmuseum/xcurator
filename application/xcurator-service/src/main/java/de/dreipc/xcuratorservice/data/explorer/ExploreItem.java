package de.dreipc.xcuratorservice.data.explorer;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.story.Story;
import org.bson.types.ObjectId;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "__typename")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Artefact.class, name = "Artefact"),
    @JsonSubTypes.Type(value = Story.class, name = "Story")
})
public interface ExploreItem {
    ObjectId getId();
}
