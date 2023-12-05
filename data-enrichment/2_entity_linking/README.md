# Entity Linking

### Wikidata linked data-sources:
- GND: [P227](https://www.wikidata.org/wiki/Property:P227) (GND identifier)
- VIAF: [P214](https://www.wikidata.org/wiki/Property:P214) (VIAF identifier)

### Workflow of Entity Linking
**Input**: unstructured Text
1. **Cleaning Texts**: (remove whitespaces, handle special chars (e.g. Umlaute in German)
2. **Name Entity Recognition (NER)**: Identity named entities (mentions) in the text (e.g. names of persons, locations, organizations)
3. **Candidate Generation**: Find possible candidates for each mention (e.g. persons with the same name) in the knowledge base
4. **Entity linking / disambiguation**: using a model to link the mention to the correct entity in the knowledge base

**Output**: list of linked entities with their position in the text. [named-entities.graphqls](named-entities.graphqls)

Note: If you want to display entities in the given text, a position map needs to be calculated for each entity for mapping cleaned text positions into the given text.


### Entity Linking Approaches
| Library                                                                           | Description                                                                                                                                            | Language                                                                                 | License                                       | Paper                                                                               |
|:----------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|:----------------------------------------------|:------------------------------------------------------------------------------------|
| [Radbound Entity Linker (REL)](https://github.com/informagi/REL)                  | Entity Linking and Disambiguation with Spacy and Flair support, pre trained in English with Wikidata 2019                                              | English                                                                                  | MIT                                           | -                                                                                   |
| [flairNLP (Beta)](https://flairnlp.github.io/docs/tutorial-basics/entity-linking) | Simple SOTA NLP Library Developed by (Humbold University Berlin / Zalando)                                                                             | English                                                                                  | MIT                                           | -                                                                                   |
| [mGenre](https://github.com/facebookresearch/GENRE)                               | The mGENRE system as presented in Multilingual Autoregressive Entity Linking by Facebook Research                                                      | Multi-Language                                                                           | <span style="color:red;">CC-BY-NC 4.0 </span> | [Paper](https://aclanthology.org/2022.tacl-1.16)                                    |
| [Spacy Entity Linker](https://spacy.io/api/entitylinker)                          | Entity Linking Pipeline provided by Spacy, which requires full training and linking implementation, no given model exists                              | -                                                                                        | MIT                                           | -                                                                                   |
| [Spacy OpenTapioca](https://github.com/UB-Mannheim/spacyopentapioca)              | Entity Linker done by the University Mannheim using spacy as core.                                                                                     | English                                                                                  | MIT |
| [DBpedia Spotlight](https://www.dbpedia-spotlight.org/)                           | DBpedia Spotlight is a tool for automatically annotating mentions of DBpedia resources in text.                                                        | English, German, Dutch, French, Italian, Russian, Spanish, Portugese, Hungarian, Turkish | Apache 2.0                                    | [Paper Model Approch](http://jodaiber.de/doc/entity.pdf), [Paper Lucene Approach](http://www.dbpedia-spotlight.org/docs/spotlight.pdf) |
| [BLINK](https://github.com/facebookresearch/BLINK)                                | BLINK is an Entity Linking python library that uses Wikipedia as the target knowledge base. Done by Facebook Research                                  | English                                                                                  | MIT                                           | [Paper](https://arxiv.org/pdf/1911.03814.pdf)                                       |  
| [SBB (QURATOR)](https://github.com/qurator-spk/sbb_ned)                           | Entity Linking done by SBB on German, English and French Wikidata. Note: <span style="color:red;">"large" GPU required, slow inference see docs</span> | German, English , French                                                                 | -                                             | [Paper](https://ceur-ws.org/Vol-2696/paper_163.pdf)                                 |
