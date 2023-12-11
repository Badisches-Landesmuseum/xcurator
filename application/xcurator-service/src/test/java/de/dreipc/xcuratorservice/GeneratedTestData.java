package de.dreipc.xcuratorservice;

import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.Image;
import de.dreipc.xcuratorservice.data.artefact.Licence;
import de.dreipc.xcuratorservice.data.profile.UserProfile;
import de.dreipc.xcuratorservice.data.story.Story;
import de.dreipc.xcuratorservice.data.story.StoryNotification;
import de.dreipc.xcuratorservice.data.story.StoryTextModule;
import dreipc.common.graphql.session.DreipcUser;
import dreipc.graphql.types.Language;
import org.bson.types.ObjectId;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@SuppressWarnings({"unused", "SameParameterValue"})
public final class GeneratedTestData {

    public static final String USER_ID = "6527adeb583b0a22db3ec02e";

    public static final DreipcUser USER =
            new DreipcUser(USER_ID, true, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    public static final DreipcUser ADMIN =
            new DreipcUser("test-admin", true, List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
    public static final List<Artefact> ARTEFACTS = generateArtefacts(10);
    public static final List<Story> STORIES = generateStories(10, ARTEFACTS);

    public static final UserProfile GERMAN_PROFILE = UserProfile.builder()
            .id(USER_ID)
            .preferredLanguage(Locale.GERMAN)
            .artefactFavorites(
                    ARTEFACTS.subList(0, 4).stream().map(Artefact::getId).toList())
            .build();

    public static final StoryNotification STORY_NOTIFICATION = StoryNotification.builder()
            .senderId(List.of(USER_ID))
            .storyId(STORIES.get(0).getId())
            .isRead(false)
            .isDeleted(false)
            .build();

    private static List<Story> generateStories(int count, List<Artefact> artefacts) {
        var timeZone = ZoneId.of("Europe/Berlin");

        return IntStream.range(0, count)
                .mapToObj(storyIndex -> {
                    var language = List.of(Locale.GERMAN, Locale.ENGLISH, new Locale("nl"))
                            .get((int) (Math.random() * 3));
                    return Story.builder()
                            .id(new ObjectId())
                            .title("test story nr. " + storyIndex)
                            .language(Language.valueOf(language.getLanguage().toUpperCase()))
                            .modules(generateStoryModules(3, artefacts))
                            .createdAt(Instant.now())
                            .updatedAt(Instant.now())
                            .build();
                })
                .toList();
    }

    private static List<StoryTextModule> generateStoryModules(int count, List<Artefact> artefacts) {
        return IntStream.range(0, count)
                .mapToObj(moduleIndex -> {
                    var storyArtefacts = IntStream.range(0, 3)
                            .mapToObj(number -> {
                                var artefactIndex = (int) (Math.random() * artefacts.size());
                                return artefacts.get(artefactIndex).getId();
                            })
                            .collect(Collectors.toSet());

                    return StoryTextModule.builder()
                            .id(new ObjectId())
                            .thought("thought nr." + moduleIndex)
                            .artefactIds(new ArrayList<>(storyArtefacts))
                            .index(moduleIndex)
                            .build();
                })
                .toList();
    }

    private static List<Artefact> generateArtefacts(int count) {
        return IntStream.range(0, count)
                .mapToObj(number -> {
                    var titles = Map.of(
                            Locale.GERMAN,
                            "deutscher titel nr." + number,
                            Locale.ENGLISH,
                            "english titel nr." + number,
                            new Locale("nl"),
                            "nederlands titelnummer nr." + number);

                    var descriptions = Map.of(
                            Locale.GERMAN,
                            "deutsche beschreibung nr." + number,
                            Locale.ENGLISH,
                            "english description nr." + number,
                            new Locale("nl"),
                            "nederlandse beschrijving nr." + number);

                    URL imageUrl;
                    try {
                        imageUrl = URI.create("http://example.com/image" + number + "jpg")
                                .toURL();
                        return Artefact.builder()
                                .id(new ObjectId())
                                .title(titles)
                                .description(descriptions)
                                .image(new Image(imageUrl, new Licence(), null, 200, 200))
                                .embedding(new ArrayList<Float>())
                                .build();
                    } catch (MalformedURLException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }
}
