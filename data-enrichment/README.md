# xCurator Data Enrichment Pipeline

This [sub-folder](../data-enrichment) contains all data related and enrichment related subprojects (indicated by the number prefix) to import and prepare the data which is **required** to run the [xCurator application](../application).

The Data Enrichment Pipeline is a queue of multiple steps. Each step is creating new information except the last step, which combines everything to a single dataset in the JSON Format.

<div style="text-align:center"><img src="./doc/pipeline.png" alt="pipeline"/></div>


The final JSON dataset is a list of artefacts. The Artefact Schema is described as [JSON Schema](https://json-schema.org/) here: [artefact-schema.json](./artefact-schema.json)

#### Subproject Naming Convention
```
[SEQUENCE_NUMBER]-[SUBPROJECT_NAME]
```
- **SEQUENCE_NUMBER**: Prefix sequence numbers on the folders indicates the required execution sequence. Same numbers can be executed in parallel if necessary.
- **SUBPROJECT_NAME**: the name of the project, step of enrichment

## Pipeline Steps

#### 0. Import ([0-artefact-core-import](./0-artefact-core-import))

<div style="text-align:center"><img src="./doc/import-step.png" alt="import step"/></div>
The first step is to fetch and download the core data (artefacts). Artefacts are museum objects and represent real world objects.
based on the given apis, this step is fetching, cleaning, filtering, normalizing the data to build a **list of artefacts**.
Additionally, this step downloads all artefact images, fetching **width** and **height** information, and convert them as base64 images to enable faster image enrichment's for later steps.
