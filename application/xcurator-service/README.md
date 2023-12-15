# xCurator Service

Authors: Nadav Babai, Elyess Eleuch, Sören Räuchle @ 3pc GmbH

Backend Service of the xCurator Application. This service provides the full API
used by the xCurator production system. 

## API:
- GraphQL Endpoint: `/graphql`
- Health Endpoint: `/manage/health`

## Settings:
all settings are stored in the application.yml (location: [src/main/resources/application.yml](src/main/resources/application.yml))

Environment Variables:
- `XCURATOR_VECTOR_MIN_SCORE` : float value > 1.0, default: `1.17`. This value defines when the neuronal search (nearest-neighbour) cuts off search results. a higher value is very specific, a lower value allows a more opened exploration search result.
- `CLIP_HTTP_URL` : url (starting with `http`) linking to the clip http service api to calc an embedding out of a text query.
- `OPENAI_API_KEY` : key provided by openai (account needed) to query their api.
- `OPENAI_MODEL` : name of the openai llm model, used to generate story thoughts inside the application.

Default Port: `8080`

## Build, Run Test

- Build: `gradlew clean build`
- Run Unit `Tests: gradlew clean test`
- Run Integration Tests: `gradlew clean integrationTest`
- Run End-toEnd Tests: `gradlew clean e2eTest`
- Run: `gradlew bootRun`

## Architecture Dependencies:
- MongoDb, NoSQL Storage
- Elasticsearch with installed and enabled [Elastiknn Plugin](https://alexklibisz.github.io/elastiknn/)
- (optional) clip http service | text-to-vector api