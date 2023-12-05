import itertools
import operator
from datetime import datetime
from typing import Dict

import pandas
from py_config import data_dir


@staticmethod
def build_report(algorithm: str, data: Dict[str, Dict]):
    date_string = datetime.now().strftime("%Y-%m-%d")
    algorithm_info = "[SBB (QURATOR)](https://github.com/qurator-spk/sbb_ned)" if algorithm == "sbb" else "[Radbound Entity Linker (REL)](https://github.com/informagi/REL)"

    person_stats = f"|Persons|{data['de']['unique_persons']}|{data['en']['unique_persons']}|{data['nl']['unique_persons']}|{data['de']['total_persons']}|{data['en']['total_persons']}|{data['nl']['total_persons']}|"
    location_stats = f"|Locations|{data['de']['unique_locations']}|{data['en']['unique_locations']}|{data['nl']['unique_locations']}|{data['de']['total_locations']}|{data['en']['total_locations']}|{data['nl']['total_locations']}|"
    organisation_stats = f"|Organisations|{data['de']['unique_organisations']}|{data['en']['unique_organisations']}|{data['nl']['unique_organisations']}|{data['de']['total_organisations']}|{data['en']['total_organisations']}|{data['nl']['total_organisations']}|"

    entity_by_id_de = data['de']['entity_by_id']
    entity_by_id_en = data['en']['entity_by_id']
    entity_by_id_nl = data['nl']['entity_by_id']

    top_persons = ""
    for index in range(0, 30):
        person_de = data['de']["top_persons"][index]
        person_en = data['en']["top_persons"][index]
        person_nl = data['nl']["top_persons"][index]
        person = f"| {index+1}. | [{entity_by_id_de[person_de[0]]}]({person_de[0]}) ({person_de[1]}) | [{entity_by_id_en[person_en[0]]}]({person_en[0]}) ({person_en[1]}) | [{entity_by_id_nl[person_nl[0]]}]({person_nl[0]}) ({person_nl[1]}) |"
        top_persons += f"{person}\n"

    top_locations = ""
    for index in range(0, 30):
        location_de = data['de']["top_locations"][index]
        location_en = data['en']["top_locations"][index]
        location_nl = data['nl']["top_locations"][index]
        location = f"| {index+1}. | [{entity_by_id_de[location_de[0]]}]({location_de[0]}) ({location_de[1]}) | [{entity_by_id_en[location_en[0]]}]({location_en[0]}) ({location_en[1]}) | [{entity_by_id_nl[location_nl[0]]}]({location_nl[0]}) ({location_nl[1]}) |"
        top_locations += f"{location}\n"


    top_organisations = ""
    for index in range(0, 30):
        organisation_de = data['de']["top_organisations"][index]
        organisation_en = data['en']["top_organisations"][index]
        organisation_nl = data['nl']["top_organisations"][index]
        organisation = f"| {index+1}. | [{entity_by_id_de[organisation_de[0]]}]({organisation_de[0]}) ({organisation_de[1]}) | [{entity_by_id_en[organisation_en[0]]}]({organisation_en[0]}) ({organisation_en[1]}) | [{entity_by_id_nl[organisation_nl[0]]}]({organisation_nl[0]}) ({organisation_nl[1]}) |"
        top_organisations += f"{organisation}\n"

    report = f"""
# Report | xCurator Entity Linking | {algorithm.upper()}

- **Date**: {date_string}
- **Algorithm**: {algorithm_info}
- **Language**: de, en, nl
- **Dataset**: 10.000 Objects | 5.000 BLM / 5.000 AP

<br />


## Table of content:
- [Overview](#overview)
- [Top Persons](#top-persons-by-occurance)
- [Top Locations](#top-locations-by-occurance)
- [Top Organisations](#top-organisations-by-occurance)

<br />


## Overview
| Category  | Unique (de)  | Unique (en) | Unique (nl) | Total (de)   |  Total (en)   | Total (nl)   |
|---|--:|--:|--:|--:|--:|--:|
{person_stats}
{location_stats}
{organisation_stats}


<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Top Persons (by occurance)
|Rank|German|English|Dutch|
|---|--:|--:|--:|
{top_persons}


### Top Locations (by occurance)
|Rank|German|English|Dutch|
|---|--:|--:|--:|
{top_locations}


### Top Organisations (by occurance)
|Rank|German|English|Dutch|
|---|--:|--:|--:|
{top_organisations}
        """

    with data_dir(f"xcurator-nel-overview-{algorithm.upper()}-10000.md").open("w", encoding="utf-8") as report_file:
        report_file.write(report)







files = list(data_dir().rglob("*entities_*.csv"))
languages = ["de", "en", "nl"]

df_artefacts = pandas.read_json(list(data_dir().rglob("xcurator_2023-11-01.json"))[0], orient='records')
df_sbb = pandas.read_json(list(data_dir().rglob("sbb-xcurator-entities_2023-11-16.json"))[0], orient='records')
df_rel = pandas.read_json(list(data_dir().rglob("rel-xcurator-entities_2023-11-15.json"))[0], orient='records')

df_artefacts["source_id"] = df_artefacts['sourceInfo'].map(lambda x: x['id'])
keys = list(df_sbb.source_id.values)
df_artefacts = df_artefacts[df_artefacts['source_id'].isin(keys)]

df_sbb = df_artefacts.merge(df_sbb, left_on='source_id', right_on='source_id', how="left")
df_sbb.to_json(data_dir("report/sbb-xcurator-sample.json"), orient="records")
df_rel = df_artefacts.merge(df_rel, left_on='source_id', right_on='source_id', how="left")
df_rel.to_json(data_dir("report/rel-xcurator-sample.json"), orient="records")

all_entities = {
    "rel": {"de": [], "en": [], "nl": []},
    "sbb": {"de": [], "en": [], "nl": []},
}

for name, df in {"sbb": df_sbb, "rel": df_rel}.items():
    for index, row in df.iterrows():
        id = row["source_id"]
        entities_by_language = row["entities"]
        if not isinstance(entities_by_language, dict):
            continue

        for language in ["de", "en", "nl"]:
            if language not in entities_by_language:
                continue

            entities = entities_by_language[language]
            all_entities[name][language].append(entities)

reports = {"sbb": "", "rel": ""}
for algorithm, data_by_language in all_entities.items():
    data = {"de": {}, "en": {}, "nl": {}}
    for language, artefacts in data_by_language.items():
        entities = list(itertools.chain.from_iterable(artefacts))
        wikidata_persons = [entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                            entity["linkedData"]["wikipedia"]["url"] for entity in entities if entity["type"] == "PER"]
        person_count = {key: wikidata_persons.count(key) for key in set(wikidata_persons)}
        person_count = dict(sorted(person_count.items(), key=operator.itemgetter(1), reverse=True))

        wikidata_locations = [entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                              entity["linkedData"]["wikipedia"]["url"] for entity in entities if
                              entity["type"] == "LOC"]
        location_count = {key: wikidata_locations.count(key) for key in set(wikidata_locations)}
        location_count = dict(sorted(location_count.items(), key=operator.itemgetter(1), reverse=True))

        wikidata_organisations = [entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                                  entity["linkedData"]["wikipedia"]["url"] for entity in entities if
                                  entity["type"] == "ORG"]
        organisation_count = {key: wikidata_organisations.count(key) for key in set(wikidata_organisations)}
        organisation_count = dict(sorted(organisation_count.items(), key=operator.itemgetter(1), reverse=True))

        entity_by_id = {entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                        entity["linkedData"]["wikipedia"]["url"]: entity['literal'] for entity in entities}
        top_persons = list(person_count.items())[:30]
        top_locations = list(location_count.items())[:30]
        top_organisations = list(organisation_count.items())[:30]

        data[language] = {
            "top_persons": list(person_count.items())[:30],
            "top_locations": list(location_count.items())[:30],
            "top_organisations": list(organisation_count.items())[:30],
            "unique_persons": len(list(person_count.keys())),
            "unique_locations": len(list(location_count.keys())),
            "unique_organisations": len(list(organisation_count.keys())),
            "total_persons": len(wikidata_persons),
            "total_locations": len(wikidata_locations),
            "total_organisations": len(wikidata_organisations),
            "entity_by_id": entity_by_id,
        }
    build_report(algorithm, data)