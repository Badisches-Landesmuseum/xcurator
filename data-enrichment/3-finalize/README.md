# xCurator finalize data

This script combines all enrichment parts together. 
The output is used to start / update the application.

### Stable Artefact Identifier
This script is able to add id's of a running xcurator system. This is necessary to update date without affecting the stories written on your environment. 
For that, there is a [data/xcurator.artefact_ids.csv](./data/xcurator.artefact_ids.csv) which maps the imported source.id into a given xcurator id.

please connect to your production mongodb instance and extract this list using your `artefact` collection selecting only the `_id` and the `sourceInfo.id` Field
and export it as `csv` file.


### Install, Run, Test

- Install dependencies: ```poetry install```
- Install Testing dependencies: ```poetry install --with dev,test```
- Run Tests: ```poetry run tests```


### Tech-Stack
- [Python](https://www.python.org/)
- [Poetry](https://python-poetry.org/)
- More dependencies ```pyproject.toml```