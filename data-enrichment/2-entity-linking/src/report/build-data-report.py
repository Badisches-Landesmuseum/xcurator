import itertools
import operator

import pandas
from py_config import data_dir

languages = ["de", "en", "nl"]
df_sbb = pandas.read_json(data_dir("report/sbb-xcurator-sample.json"), orient="records")
df_rel = pandas.read_json(data_dir("report/rel-xcurator-sample.json"), orient="records")

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

for algorithm, data_by_language in all_entities.items():
    with pandas.ExcelWriter(data_dir(f'report/xcurator-{algorithm}-entity-data.xlsx')) as writer:
        for language, artefacts in data_by_language.items():
            entities = list(itertools.chain.from_iterable(artefacts))

            entities = list(itertools.chain.from_iterable(artefacts))
            wikidata_persons = [entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                                entity["linkedData"]["wikipedia"]["url"] for entity in entities if entity["type"] == "PER"]
            persons = {entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                       entity["linkedData"]["wikipedia"]["url"]: entity for entity in entities if entity["type"] == "PER"}
            person_count = {key: wikidata_persons.count(key) for key in set(wikidata_persons)}
            person_count = dict(sorted(person_count.items(), key=operator.itemgetter(1), reverse=True))

            person_tuple = []
            for link, count in person_count.items():
                person = persons[link]
                person_tuple.append((person['literal'], link, count))

            df_person = pandas.DataFrame(person_tuple, columns=['Name', 'URL', 'Occurance'])
            df_person.to_excel(writer,
                               sheet_name=f'Persons {language}')

            wikidata_locations = [entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                                  entity["linkedData"]["wikipedia"]["url"] for entity in entities if
                                  entity["type"] == "LOC"]
            locations = {entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                         entity["linkedData"]["wikipedia"]["url"]: entity for entity in entities if
                         entity["type"] == "LOC"}
            location_count = {key: wikidata_locations.count(key) for key in set(wikidata_locations)}
            location_count = dict(sorted(location_count.items(), key=operator.itemgetter(1), reverse=True))
            location_tuple = []
            for link, count in location_count.items():
                location = locations[link]
                location_tuple.append((location['literal'], link, count))

            df_location = pandas.DataFrame(location_tuple, columns=['Name', 'URL', 'Occurance'])
            df_location.to_excel(writer,
                                 sheet_name=f'Locations {language}')

            wikidata_organisations = [entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                                      entity["linkedData"]["wikipedia"]["url"] for entity in entities if
                                      entity["type"] == "ORG"]
            organisations = {entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else
                             entity["linkedData"]["wikipedia"]["url"]: entity for entity in entities if
                             entity["type"] == "ORG"}
            organisation_count = {key: wikidata_organisations.count(key) for key in set(wikidata_organisations)}
            organisation_count = dict(sorted(organisation_count.items(), key=operator.itemgetter(1), reverse=True))
            organisation_tuple = []
            for link, count in organisation_count.items():
                organisation = organisations[link]
                organisation_tuple.append((organisation['literal'], link, count))

            df_organisation = pandas.DataFrame(organisation_tuple, columns=['Name', 'URL', 'Occurance'])
            df_organisation.to_excel(writer,
                                     sheet_name=f'Organisations {language}')

artefact_entity_by_language = all_entities = {
    "rel": {"de": [], "en": [], "nl": []},
    "sbb": {"de": [], "en": [], "nl": []},
}
for name, df in {"sbb": df_sbb, "rel": df_rel}.items():
    elem_data = {"de": [], "en": [], "nl": []}
    for index, item in df.iterrows():
        id = item["source_id"]
        entities_by_language = item["entities"]

        if not isinstance(entities_by_language, dict):
            continue

        for language in ["de", "en", "nl"]:
            if language not in entities_by_language:
                continue

            entities = entities_by_language[language]
            title = item['title'][language]
            description = item['description'][language] if language in item['description'] else ""

            date = item['dateRange']['literal'] if item['dateRange'] and item['dateRange'][
                'literal'] is not None else ""
            person_names = ", ".join([person['name'] for person in item['persons']])
            location_names = ", ".join([location['name'] for location in item['locations']])
            keywords = ", ".join([keyword for keyword in item['keywords']])

            context = ". ".join(
                [context_part for context_part in [date, person_names, location_names, keywords] if context_part])

            text = f"{context}{title}{description}"

            compressed_entities = []
            for entity in entities:
                link = entity["linkedData"]["wikidata"]["url"] if "wikidata" in entity["linkedData"] else entity["linkedData"]["wikipedia"]["url"]
                compressed_entities.append((entity['literal'], entity['type'], link, entity['property']))

            elem = (id, text, compressed_entities, title, description, context)
            elem_data[language].append(elem)

    with pandas.ExcelWriter(data_dir(f'report/xcurator-{name}-object-data.xlsx')) as writer:
        for language, elements in elem_data.items():
            elements.reverse()
            df = pandas.DataFrame(elements, columns=['Object ID', 'Text', 'Entities', "Object Title", "Object Description", "Object Context"])
            df.to_excel(writer,sheet_name=f'Objects {language}')