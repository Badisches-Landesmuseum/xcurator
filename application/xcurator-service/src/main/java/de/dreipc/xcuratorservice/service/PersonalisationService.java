package de.dreipc.xcuratorservice.service;

import de.dreipc.xcuratorservice.data.profile.ProfileEpoch;
import de.dreipc.xcuratorservice.data.profile.ProfileMaterial;

import java.util.List;

public class PersonalisationService {

    public static List<String> epoch(ProfileEpoch profileEpoch) {
        return switch (profileEpoch) {
            case ANTIQUITY -> List.of("ANTIKE");
            case MIDDLE_AGES -> List.of("FRUEHES_MITTELALTER", "ROMANIK", "GOTIK", "RENAISSANCE");
            case MODERN_AND_PRESENT -> List.of("BAROCK", "ROMANTIK", "MODERNE", "POSTMODERNE");
            case PRE_AND_EARLY_HISTORY -> List.of("UR_UND_FRUEHGESCHICHTE");
        };
    }

    public static List<String> materials(ProfileMaterial material) {
        return switch (material) {
            case STONE -> List.of("Keramik", "PORCELAIN", "Glas");
            case METAL -> List.of("Silber", "Bronze", "Eisen");
            case PAPER -> List.of("Fotografische Schicht", "Fotopapier", "PE-Papier", "Film");
            case WOOD -> List.of("Holz");
        };
    }
}
