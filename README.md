# xCurator


## System
The xcurator system is splitted into two parts. 
1. **Data Enrichment**: This part of the system is responsible for importing, cleaning and enriching the data. 
Yor need to run it if you want to `update` your data or `create` a new dataset for xcurator. 
All the code and configs are located inside the [data-enrichment](./data-enrichment) directory if this repository.
</br></br>More info: [data-enrichment/README](data-enrichment/README.md)
2. **Web-Application**: This part of the system contains all the code and configs, which are necessary to `build`, `run` and `deploy` the application.
   </br></br>More info: [application/README](application/README.md)

## Tech Stack
- Frontend: [TypeScript](https://www.typescriptlang.org/) | [Next.js](https://nextjs.org/) | [React](https://react.dev/) | [GraphQL (Apollo)](https://www.apollographql.com/) | [yarn](https://yarnpkg.com/)
- Backend: [Java (OpenJDK)](https://openjdk.org/) | [Spring Boot](https://spring.io/) | [GraphQL (DGS Netflix)](https://netflix.github.io/dgs/) | [Gradle](https://gradle.org/)
- AI | Data: [Python](https://www.python.org/) | [Pandas](https://pandas.pydata.org/) | [PyTorch](https://pytorch.org/) | [Poetry](https://python-poetry.org/)
- Infrastructure: [MongoDB](https://www.mongodb.com/) | [Elasticsearch](https://www.elastic.co/de/elasticsearch) | [Keycloak](https://www.keycloak.org/) | [Docker (Compose)](https://www.docker.com/)

## Credits

### [pixolution](https://pixolution.org/)
In the collection exploration-feature we used the [embeddings-grid](https://github.com/pixolution/embeddings-grid) technology. 

### [Staatsbibliothek zu Berlin – Preußischer Kulturbesitz](https://staatsbibliothek-berlin.de/)
„The Named Entity Recognition and Entity Linking system used was developed by the Staatsbibliothek zu Berlin – Preußischer Kulturbesitz (https://staatsbibliothek-berlin.de/) in the BMBF-funded project QURATOR – Curation Technologies (https://qurator.ai/).“