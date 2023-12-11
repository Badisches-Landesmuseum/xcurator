# Image Clip Service

**Authors**: Sören Räuchle @ [3pc GmbH](https://www.3pc.de)

This service is responsible for the core data input of xcurator. Based on the given API's of BLM and AP.
This service downloads the data and normalizing it to the xcurator dataset.

### Script steps:
1. Download all data available of BLM and AP
2. Convert and normalize data into the [artefact core data schema](./artefact-core-schema.json)
3. Filter data without titles




### Install, Run, Test

- Install dependencies: ```poetry install```
- Install Testing dependencies: ```poetry install --with dev,test```
- Run Tests: ```poetry run tests```


### Tech-Stack
- [Python](https://www.python.org/)
- [Poetry](https://python-poetry.org/)
- More dependencies ```pyproject.toml```

