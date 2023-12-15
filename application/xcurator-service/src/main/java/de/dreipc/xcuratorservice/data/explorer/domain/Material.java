package de.dreipc.xcuratorservice.data.explorer.domain;

public enum Material {
    PHOTO_LAYER("Fotografische Schicht"),
    WOOD("Holz"),
    GLASS("Glas"),

    BRONZE("Bronze"),
    SILVER("Silber"),

    PHOTO_PAPER("Fotopapier"),
    MOVIE("Film"),

    IRON("Eisen"),

    CERAMICS("Keramik"),

    PORCELAIN("Porzellan"),

    PE_PAPER("PE-Papier");

    public final String name;

    Material(String name) {
        this.name = name;
    }

    public String value() {
        return this.name;
    }
}
