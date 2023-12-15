# xCurator Core Import

**Authors**: Sören Räuchle @ [3pc GmbH](https://www.3pc.de)

This service is responsible for the core data input of xcurator. Based on the given API's of BLM and AP.
This service downloads the data and normalizing it to the xcurator dataset.

### Script steps:
1. Download all data available of BLM and AP
2. Convert and normalize data into the [artefact core data schema](./artefact-core-schema.json)
3. Download and prepare Images for enrichment
4. Fetch all Image sizes


### Data requirements
Minimum data requirements for artefacts.
- Title (min 1 language)
- Image as [IIIF URL v2 | v3](https://iiif.io/api/image/3.0/#:~:text=The%20IIIF%20Image%20API%20specifies,format%20of%20the%20requested%20image.), accessible (including. info.json)
- Image Licence (url + name)


### Install, Run, Test

- Install dependencies: ```poetry install```
- Install Testing dependencies: ```poetry install --with dev,test```
- Run Tests: ```poetry run tests```


### Tech-Stack
- [Python](https://www.python.org/)
- [Poetry](https://python-poetry.org/)
- More dependencies ```pyproject.toml```

