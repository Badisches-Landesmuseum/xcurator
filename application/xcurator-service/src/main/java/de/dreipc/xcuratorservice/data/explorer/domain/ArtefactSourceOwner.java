package de.dreipc.xcuratorservice.data.explorer.domain;

public enum ArtefactSourceOwner {
    BLM("Badisches Landesmuseum"),
    AP("Allard Pierson Museum");

    public final String name;

    ArtefactSourceOwner(String name) {
        this.name = name;
    }

    public String value() {
        return this.name;
    }
}
