plugins {
    java
    id("org.springframework.boot") version "3.1.4"
    id("io.spring.dependency-management") version "1.1.3"
    id("com.netflix.dgs.codegen") version "6.0.3"
    id("de.3pc.development") version "0.1.15"
}

group = "de.dreipc"

tasks.withType<com.netflix.graphql.dgs.codegen.gradle.GenerateJavaTask> {
    //     packageName and subPackageNameTypes are set to generate correct union | interfaces
    packageName = "dreipc.graphql"
    generateClient = false
    addGeneratedAnnotation = true

    typeMapping = mutableMapOf(

        // Artefact
        "Artefact" to "de.dreipc.xcuratorservice.data.artefact.Artefact",
        "Image" to "de.dreipc.xcuratorservice.data.artefact.Image",
        "DataSource" to "de.dreipc.xcuratorservice.data.artefact.DataSource",
        "DateRange" to "de.dreipc.xcuratorservice.data.artefact.DateRange",
        "Location" to "de.dreipc.xcuratorservice.data.artefact.Location",
        "Person" to "de.dreipc.xcuratorservice.data.artefact.Person",

        "NamedEntity" to "de.dreipc.xcuratorservice.data.artefact.NamedEntity",
        "LinkedData" to "de.dreipc.xcuratorservice.data.artefact.LinkedData",

        // Search
        "ExploreItem" to "de.dreipc.xcuratorservice.data.explorer.ExploreItem", // Needed to code due to bug: https://github.com/Netflix/dgs-codegen/issues/490
        "GridInfo" to "de.dreipc.xcuratorservice.data.explorer.GridInfo",

        // Profile
        "UserProfile" to "de.dreipc.xcuratorservice.data.profile.UserProfile",
        "VisitorRole" to "de.dreipc.xcuratorservice.data.profile.VisitorRole",
        "VisitorTarget" to "de.dreipc.xcuratorservice.data.profile.VisitorTarget",
        "VisitorWish" to "de.dreipc.xcuratorservice.data.profile.VisitorWish",
        "Continent" to "de.dreipc.xcuratorservice.data.profile.Continent",
        "ProfileEpoch" to "de.dreipc.xcuratorservice.data.profile.ProfileEpoch",

        // Story
        "Story" to "de.dreipc.xcuratorservice.data.story.Story",

        // Common
        "URL" to "java.net.URL",
        "HTML" to "java.lang.String",
        "CountConnection" to "dreipc.common.graphql.relay.CountConnection",
        "RGB" to "java.lang.String",
        "Duration" to "java.time.Duration",
        "DateTime" to "java.time.LocalDateTime",
        "LocalDate" to "java.util.Date",
        "Upload" to "org.springframework.web.multipart.MultipartFile",
        "Latitude" to "java.lang.Double",
        "Longitude" to "java.lang.Double",
        "IIIFIdentifier" to "java.lang.String",
        "EMail" to "java.lang.String",
    )
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
    // https://mvnrepository.com/artifact/org.hibernate/hibernate-validator
    implementation("org.hibernate:hibernate-validator:8.0.1.Final")


    // Navigu (by Pixsolution)
    implementation(files("$projectDir/libs/embeddings-grid-plain.jar"))

    // GraphQl (including common schemas)
    implementation("de.3pc:graphql:8.1.1-dev.315")
    dgsCodegen("de.3pc:graphql:8.1.1-dev.315")
    implementation("de.3pc:elasticsearch:8.11.1-dev.23")

    testImplementation("org.springframework.security:spring-security-test")
}
