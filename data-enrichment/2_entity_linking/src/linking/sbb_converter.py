import json
import re
from json import JSONEncoder
from pathlib import Path
from typing import Dict, Tuple, List, Set

import pandas
import requests
from pandas import DataFrame
from py_config import print_3pc_banner, data_dir
from tqdm import tqdm

from src.models.entity import Entity

print_3pc_banner()

print("""
###########################################################################
#           convert sbb ner to xcurator entities                         #
###########################################################################

Requirement:
- `data` directory including a *output.json file containing the sbb nel output data
""")


# Data
# de_json_file = list(data_dir().rglob("*-de-output.json"))[0]
# print(f"Found german data: {de_json_file}")
# df_german = pandas.read_json(de_json_file, orient='records')
#
# en_json_file = list(data_dir().rglob("*-en-output.json"))[0]
# print(f"Found english data: {en_json_file}")
# df_english = pandas.read_json(en_json_file, orient='records')
#
# nl_json_file = list(data_dir().rglob("*-nl-output.json"))[0]
# print(f"Found dutch data: {nl_json_file}")
# df_dutch = pandas.read_json(nl_json_file, orient='records')
#
# artefact_json_file = list(data_dir().rglob("artefacts_core_*.json"))[0]
# df_artefacts = pandas.read_json(artefact_json_file, orient='records')
# df_artefacts["source_id"] = df_artefacts['sourceInfo'].map(lambda x: x['id'])
#
# translation_json_file = list(data_dir().rglob("artefacts-translation_*.json"))[0]
# df_translations = pandas.read_json(translation_json_file, orient='records')
#
# df_artefacts.drop(columns=["title", "description"], inplace=True)
# df_artefacts = df_artefacts.merge(df_translations, left_on='source_id', right_on='source_id', how="left")


class EntityEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__


def to_df(entities: Dict, language: str) -> DataFrame:
    data = [(id, language, json.dumps({language: elem}, indent=2, cls=EntityEncoder)) for id, elem in entities.items()]
    return pandas.DataFrame(data, columns=['source_id', 'language', 'entities'])


def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def fetch_wikipedia_ids(wikidata_ids: Set[str]):
    id_batches = chunks(list(wikidata_ids), 50)
    cache_file = data_dir("wikidata_to_wikipedia.json")
    if cache_file.exists():
        with data_dir("wikidata_to_wikipedia.json").open("r") as json_file:
            id_to_title = json.load(json_file)
    else:
        id_to_title = {}
    for batch in id_batches:
        batches = [id for id in batch if id not in id_to_title.keys()]
        if not batches:
            continue
        ids = "|".join(batch)
        response = requests.get(
            f"https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids={ids}&sitefilter=enwiki",
            headers={'Accept': 'application/json'})
        if response.status_code == 200:
            try:
                body = response.json()
                for id, data in body["entities"].items():
                    if "sitelinks" in data["sitelinks"] and data['sitelinks']:
                        title = data["sitelinks"]["enwiki"]["title"]
                    else:
                        title = ""
                    id_to_title[id] = title
            except Exception as e:
                with data_dir("wikidata_to_wikipedia.json").open("w") as json_file:
                    json.dump(id_to_title, json_file, indent=2)

        else:
            with data_dir("wikidata_to_wikipedia.json").open("w") as json_file:
                json.dump(id_to_title, json_file, indent=2)
    with data_dir("wikidata_to_wikipedia.json").open("w") as json_file:
        json.dump(id_to_title, json_file, indent=2)
    return id_to_title


def to_entity(entities: List[Entity], id_mapper: Dict) -> List[Dict]:
    test = []
    for entity in entities:
        entry_json = {
            "literal": entity.literal,
            "property": entity.property,
            "type": entity.category,
            "startPosition": entity.start_position,
            "endPosition": entity.end_position,
            "linkedData": {
                "wikidata": {
                    "url": f"https://www.wikidata.org/entity/{entity.link_id}",
                    "id": entity.link_id,
                }
            }
        }

        if entity.link_id in id_mapper and id_mapper[entity.link_id]:
            wikipedia_id = id_mapper[entity.link_id]
            entry_json["linkedData"]["wikipedia"] = {
                "url": f"https://en.wikipedia.org/wiki/{wikipedia_id}",
                "id": wikipedia_id,
            }
        test.append(entry_json)
    return test


def to_json(entities: Dict, mapper: Dict) -> Dict[str, List[str]]:
    return {id: to_entity(elem, mapper) for id, elem in entities.items()}


class SBBLinker:

    def __init__(self, df_artefacts: DataFrame):
        de_json_file = list(data_dir().rglob("*-de-output.json"))[0]
        print(f"Found german data: {de_json_file}")
        self._df_german = pandas.read_json(de_json_file, orient='records')

        en_json_file = list(data_dir().rglob("*-en-output.json"))[0]
        print(f"Found english data: {en_json_file}")
        self._df_english = pandas.read_json(en_json_file, orient='records')

        nl_json_file = list(data_dir().rglob("*-nl-output.json"))[0]
        print(f"Found dutch data: {nl_json_file}")
        self._df_dutch = pandas.read_json(nl_json_file, orient='records')

        self._df_artefacts = df_artefacts

    def get_artefact(self, source_id: str) -> Dict:
        artefact = self._df_artefacts.loc[self._df_artefacts['source_id'] == source_id]
        if len(artefact) == 0:
            return {}
        return artefact.to_dict("records")[0]

    def build_text(self, language: str, item: Dict) -> Tuple[str, int, int]:
        title = item['title'][language]
        description = item['description'][language] if language in item['description'] else ""

        date = item['dateRange']['literal'] if item['dateRange'] and item['dateRange'][
            'literal'] is not None else ""
        person_names = ", ".join([person['name'] for person in item['persons']])
        location_names = ", ".join([location['name'] for location in item['locations']])
        keywords = ", ".join([keyword for keyword in item['keywords']])

        context = ". ".join(
            [context_part for context_part in [date, person_names, location_names, keywords] if context_part])

        return (f"{context}{title}{description}", len(context), len(title))

    def remove_overlaps(self, entities: List[Entity]) -> List[Entity]:
        if len(entities) <= 1:
            return entities

        entities.sort(key=lambda x: x.start_position, reverse=False)
        result = []
        current_end = -1

        for entity in entities:
            # no overlapping
            if entity.start_position > current_end:
                result.append(entity)
                current_start, current_end = entity.start_position, entity.end_position
            # not the same property
            elif result[-1].property != entity.property:
                result.append(entity)
                current_start, current_end = entity.start_position, entity.end_position
            else:
                overlap_entity = result[-1]
                # literal which is longer wins
                if len(entity.literal) > len(overlap_entity.literal):
                    result[-1] = entity
                    current_start, current_end = entity.start_position, entity.end_position
                    continue
                # better link score wins
                else:
                    best_entity = overlap_entity if overlap_entity.link_score >= entity.link_score else entity
                    result[-1] = best_entity
                    current_start, current_end = best_entity.start_position, best_entity.end_position

        return result

    def convert(self) -> Path:
        unknown = 0
        result = {}
        wikidata_ids = set()

        for language, df in {"de": self._df_german, "en": self._df_english, "nl": self._df_dutch}.items():
            language_entities = {}
            with tqdm(total=len(df)) as pbar:
                for index, item in df.iterrows():
                    text = item['text']
                    links = item['ned']
                    ner = item['ner']
                    source_id = item['id']
                    position = 0
                    if source_id not in language_entities:
                        language_entities[source_id] = []

                    artefact = self.get_artefact(source_id)
                    if not artefact:
                        unknown += 1
                        pbar.update(1)
                        continue
                    artefact_context = self.build_text(language, artefact)
                    artefact_text = artefact_context[0]
                    artefact_context_len = artefact_context[1]
                    artefact_title_len = artefact_context[2]

                    for name, ranking in links.items():
                        if not ranking:
                            pbar.update(1)
                            continue
                        best_entity = ranking['ranking'][0]
                        category = name.split("-")[-1:][0]
                        literal = name[:-1 - len(category)]
                        if text[position:].find(literal) == -1:
                            literal = re.sub(r"\s(?=[\\.])", "", string=literal)
                        start_pos = text[position:].find(literal)
                        end_pos = start_pos + len(literal)
                        if start_pos < 0:
                            pbar.update(1)
                            continue

                        if start_pos > artefact_context_len and end_pos <= (artefact_context_len + artefact_title_len):
                            property = "title"
                            start_pos = start_pos - artefact_context_len
                            end_pos = end_pos - artefact_context_len
                        elif start_pos >= (artefact_context_len + artefact_title_len):
                            property = "description"
                            start_pos = start_pos - artefact_title_len - artefact_context_len
                            end_pos = end_pos - artefact_title_len - artefact_context_len
                        else:
                            pbar.update(1)
                            continue

                        entity = Entity(
                            literal=literal,
                            property=property,
                            start_position=start_pos,
                            end_position=end_pos,
                            sentence=(0, 0),
                            category=category,
                            category_score=0.0,
                            link_source_name="wikidata",
                            link_score=round(best_entity[1]['proba_1'] * 100.00, 2),
                            link_id=best_entity[1]['wikidata']
                        )
                        wikidata_ids.add(entity.link_id)
                        language_entities[source_id].append(entity)
                    pbar.update(1)
                    language_entities[source_id] = self.remove_overlaps(language_entities[source_id])
            result[language] = language_entities

        id_to_title = fetch_wikipedia_ids(wikidata_ids)
        result_json = {}
        result_json["de"] = to_json(result["de"], id_to_title)
        result_json["en"] = to_json(result["en"], id_to_title)
        result_json["nl"] = to_json(result["nl"], id_to_title)
        df_de = to_df(result_json["de"], "de")
        df_en = to_df(result_json["en"], "en")
        df_nl = to_df(result_json["nl"], "nl")
        df = pandas.concat([df_de, df_en, df_nl])
        df.to_csv(data_dir("sbb-temp-entities.csv"), index=False)

        print(f"missed entries: {unknown}")
        return data_dir("sbb-temp-entities.csv")
