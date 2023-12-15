# xCurator Data Enrichment Pipeline

This [sub-folder](../data-enrichment) contains all data related and enrichment related subprojects (indicated by the number prefix) to import and prepare the data which is **required** to run the [xCurator application](../application).

The Data Enrichment Pipeline is a queue of multiple steps. Each step is creating new information except the last step, which combines everything to a single dataset in the JSON Format.

<div style="text-align:center"><img src="./doc/pipeline.png" alt="pipeline"/></div>


The final JSON dataset is a list of artefacts. The Artefact Schema is described as [JSON Schema](https://json-schema.org/) here: [artefact-schema.json](./artefact-schema.json)

**Subproject Naming Convention:** `[SEQUENCE_NUMBER]-[SUBPROJECT_NAME]`

- **SEQUENCE_NUMBER**: Prefix sequence numbers on the folders indicates the required execution sequence. Same numbers can be executed in parallel if necessary.
- **SUBPROJECT_NAME**: the name of the project, step of enrichment

## Build and Run
All pipeline projects include a Dockerfile to build a Container out of it.
These are combined in the [docker-compose.yml](./docker-compose.yml) to build a semantically single pipeline.
Please check the [docker-compose.yml](./docker-compose.yml) if all Environment Variables are set properly for your use case and environment.

### Requirements:
- Docker installed and configured for gpu usage ([GPU access with Docker Compose](https://docs.docker.com/compose/gpu-support/))
- Deepl API Key ([Deepl Docs](https://support.deepl.com/hc/en-us/articles/360020695820-Authentication-Key))
- (optional) Nvidia Graphic card | highly recommended
- Internet access

### Commands
- Build `docker compose build`
- Run (foreground)`docker compose run [SERVICE]`
- Run (background) `docker compose up -d`
- Logs: `docker compose logs -f --tail 300`

## Pipeline Steps

### 0. Import ([0-artefact-core-import](./0-artefact-core-import))

The first step is to fetch and download the core data (artefacts). Artefacts are museum objects and represent real world objects.
based on the given apis, this step is fetching, cleaning, filtering and normalizing the data to build a **list of artefacts**.
Additionally, this step downloads all artefact images, fetching **width** and **height** information, and convert them as base64 images to enable faster image enrichment's for later steps.

<div style="text-align:center"><img src="./doc/import-step.png" alt="import step"/></div>


### 1. Translation ([1-translation](./1-translation))

The target of this step is to make sure that the core textual data used by the search engine and displayed to end users is available for all languages used in the project. 
This step required a `[Deepl API Key]` added inside the [docker-compose.yml](./docker-compose.yml)

<div style="text-align:center"><img src="./doc/translation-step.png" alt="translation step"/></div>


### 1. Object color ([1-artefact-object-color](./1-artefact-object-color))

The target of this step is to retrieve the color information of the artefact object itself. To make this work, this step is doing Ai image-segmentation to segment the object inside the image from the background.
Having the segmented object image, the pixels are clustered to create a color palette of the artefact.

For detailed info see here: [1-artefact-object-color/README](./1-artefact-object-color/README.md)

### 1. Embedding ([1-artefact-embedding](./1-artefact-embedding))

The target of this step is to generate visual embeddings based on the input. Currently, we use Clip embeddings to project visual und textual information into the same dimension space.
These visual embeddings are used for different search and explore features inside the application. 

<div style="text-align:center"><img src="./1-artefact-embedding/doc/embedding-step.png" alt="embedding step"/></div>

For detailed info see here: [1-artefact-embedding/README](./1-artefact-embedding/README.md)

### 2. Entity Linking([2-entity-linking](./2-entity-linking))

This step analyzes the multilingual textual information of artefacts (title, descriptions) to find named entities (persons, locations, organisations) and 
link the found entities to the equivalent entities inside the data sources wikidata, wikipedia and gnd.
The output is used for an enhanced search by additional metadata and is presented in the frontend to visitors of the application.

For detailed info see here: [2-entity-linking/README](2-entity-linking/README.md)

### 3. Finalize([3-finalize](./3-finalize))

This step combines all enrichment parts together to a single dataset. The output is used to start or update the application.

For detailed info see here: [3-finalize/README](3-finalize/README.md)




