package de.dreipc.xcuratorservice.graphql.query;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsData;
import com.netflix.graphql.dgs.DgsDataFetchingEnvironment;
import de.dreipc.xcuratorservice.data.profile.UserProfile;
import dreipc.graphql.types.Language;

@DgsComponent
public class LocationQueryHandler {

    @DgsData(parentType = "UserProfile")
    public Language preferredLanguage(DgsDataFetchingEnvironment dfe) {
        UserProfile profile = dfe.getSource();
        var language = profile.getPreferredLanguage();
        if (language == null) return null;
        else return Language.valueOf(language.getLanguage().toUpperCase());
    }
}
