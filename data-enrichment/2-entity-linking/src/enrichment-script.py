import json
import os
from datetime import datetime
from pathlib import Path

import pandas
import torch
from REL.entity_disambiguation import EntityDisambiguation
from py_config import read_app_config, print_3pc_banner, data_dir
from tqdm import tqdm
from wikimapper import WikiMapper

from gnd_linker import GNDLinker
from src.linking.entity_linker_flair import FlairEntityLinker
from src.linking.entity_linker_rel import RELEntityLinker
from src.linking.mention_detection_rel import NERSpacyMD
from src.linking.sbb_converter import SBBLinker
from src.location_finder import LocationFinder

torch.cuda.empty_cache()
print_3pc_banner()

print("""
###########################################################################
#           Named Entity Recognition + Named Entity Linking               #
###########################################################################
""")

_app_config = read_app_config()
ner_model = _app_config['model']['rel']['spacy-ner-model']
wiki_version = _app_config['model']['rel']['wiki-version']
ed_model_name = _app_config['model']['rel']['ed-model']

selected_linker = os.getenv("ENTITY_LINKER").upper().strip() if os.getenv("ENTITY_LINKER") else "REL"
output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else data_dir()
output_directory.mkdir(parents=True, exist_ok=True)

print(f"Selected entity linking mode: {selected_linker}")

# Data
artefact_json_file = list(output_directory.rglob("artefacts_core_*.json"))[0]
df_artefacts = pandas.read_json(artefact_json_file, orient='records')
df_artefacts["source_id"] = df_artefacts['sourceInfo'].map(lambda x: x['id'])

translation_json_file = list(output_directory.rglob("artefacts-translation_*.json"))[0]
df_translations = pandas.read_json(translation_json_file, orient='records')
df_translations = df_translations[["source_id", "title", "description"]]

df_artefacts.drop(columns=["title", "description"], inplace=True)
df_artefacts = df_artefacts.merge(df_translations, left_on='source_id', right_on='source_id', how="left")
if 'entities' in df_artefacts.columns:
    df_artefacts.drop(columns=["entities"], inplace=True)

print(f"using data from csv: {artefact_json_file}, {translation_json_file}")

if data_dir('blacklist.csv').exists():
    df_blacklist = pandas.read_csv(data_dir('blacklist.csv'))
    literal_blacklist = df_blacklist[df_blacklist.columns[0]].tolist()
else:
    literal_blacklist = []

date_string = datetime.now().strftime("%Y-%m-%d")

if selected_linker == "REL" and data_dir(f"rel_{wiki_version}").exists():
    base_url = str(data_dir(f"rel_{wiki_version}").absolute())

    print(f"Running on device: {'cuda' if torch.cuda.is_available() else 'cpu'}")

    # Services
    ner_classes = ['PER', 'LOC', 'ORG']
    mention_detector = NERSpacyMD(base_url, wiki_version, ner_model, ner_labels=ner_classes)
    ed_model = str(Path(base_url, f"{wiki_version}/{ed_model_name}/model").absolute())

    ed_config = {
        'mode': 'eval',
        'model_path': ed_model,  # Wired but we need to add "model" after the path!
    }

    linker = EntityDisambiguation(base_url, wiki_version, ed_config)
    entity_linker = RELEntityLinker(mention_detector, linker)
elif selected_linker == "FLAIR":
    entity_linker = FlairEntityLinker()
elif selected_linker == "SBB":
    entity_linker = SBBLinker(df_artefacts, output_directory)
else:
    print("Missing required model. Fallback to Flair Linker.")
    entity_linker = FlairEntityLinker()

print(f"Running on device: {'cuda' if torch.cuda.is_available() else 'cpu'}")

temp_result_file = data_dir(f"{selected_linker.lower()}-temp-entities.json")
result_file = output_directory / Path(f"{selected_linker.lower()}-xcurator-entities_{date_string}.json")

wikimapper = WikiMapper(str(data_dir("index_enwiki-20190420.db")))

if selected_linker != "SBB":
    if temp_result_file.exists():
        temp_result_file.unlink()

    temp_data = []

    with tqdm(total=len(df_artefacts)) as pbar:
        for index, item in df_artefacts.iterrows():
            source_id = item['sourceInfo']['id']
            for language in item['title']:
                title = item['title'][language]
                description = item['description'][language] if language in item['description'] else ""

                date = item['dateRange']['literal'] if item['dateRange'] and item['dateRange'][
                    'literal'] is not None else ""
                person_names = ", ".join([person['name'] for person in item['persons']])
                location_names = ", ".join([location['name'] for location in item['locations']])
                keywords = ", ".join([keyword for keyword in item['keywords']])

                context = ". ".join(
                    [context_part for context_part in [date, person_names, location_names, keywords] if
                     context_part])

                text = f"{context}{title}{description}"

                context_len = len(context)
                title_len = len(title)

                text = f"{context}{title}{description}"

                entities = entity_linker.extract_entity(text)
                entities = [entity for entity in entities if entity.literal not in literal_blacklist]
                entities = [entity for entity in entities if entity.literal[0].isupper()]
                title_entities = [entity for entity in entities if
                                  entity.start_position > context_len and entity.end_position <= (
                                          context_len + title_len)]
                description_entities = [entity for entity in entities if
                                        entity.start_position >= (context_len + title_len)]

                for entity in title_entities:
                    entities_json = {language: [{
                        "literal": entity.literal,
                        "property": 'title',
                        "type": entity.category,
                        "startPosition": entity.start_position - context_len,
                        "endPosition": entity.end_position - context_len,
                        "linkedData": {
                            "wikidata": {
                                "url": f"https://www.wikidata.org/entity/{wikimapper.title_to_id(entity.link_id)}",
                                "id": wikimapper.title_to_id(entity.link_id),
                            },
                            "wikipedia": {
                                "url": f"https://en.wikipedia.org/wiki/{entity.link_id}",
                                "id": entity.link_id, }
                        }
                    } for entity in title_entities]}

                    entry_title = {
                        "source_id": source_id,
                        "language": language,
                        "entities": entities_json
                    }
                    temp_data.append(entry_title)

                for entity in description_entities:
                    entities_json = {language: [{
                        "literal": entity.literal,
                        "property": 'description',
                        "type": entity.category,
                        "startPosition": entity.start_position - title_len - context_len,
                        "endPosition": entity.end_position - title_len - context_len,
                        "linkedData": {
                            "wikidata": {
                                "url": f"https://www.wikidata.org/entity/{wikimapper.title_to_id(entity.link_id)}",
                                "id": wikimapper.title_to_id(entity.link_id),
                            },
                            "wikipedia": {
                                "url": f"https://en.wikipedia.org/wiki/{entity.link_id}",
                                "id": entity.link_id, }
                        }
                    } for entity in description_entities]}
                    entry_description = {
                        "source_id": source_id,
                        "language": language,
                        "entities": entities_json
                    }
                    temp_data.append(entry_description)

                del entities
            pbar.update(1)
    df_temp = pandas.DataFrame(temp_data)
    df_temp.to_json(temp_result_file, orient='records')
elif not temp_result_file.exists():
    temp_result_file = entity_linker.convert()

gnd_linker = GNDLinker()
location_finder = LocationFinder()

print("Add GND Linking")
df = pandas.read_json(temp_result_file, orient='records')
df['entities'] = df['entities'].apply(lambda x: json.loads(x, strict=False))
entities_dict = df['entities'].to_list()
wiki_ids = set()

for item in entities_dict:
    for language, entities in item.items():
        for entity in entities:
            if 'wikidata' not in entity['linkedData']:
                continue
            wikidata_id = entity['linkedData']['wikidata']['id']
            wiki_ids.add(wikidata_id)

gnd_ids = gnd_linker.to_gnd_id(list(wiki_ids))
location_infos = location_finder.get_location_info(list(wiki_ids))


def get_continent(continent_name: str) -> str:
    match continent_name:
        case 'Africa':
            return 'AFRICA'
        case 'Asia':
            return 'ASIA'
        case 'Europe':
            return 'EUROPA'
        case 'North America':
            return 'AMERICA'
        case 'South America':
            return 'AMERICA'
        case 'Australia':
            return 'ASIA'
        case 'Oceania':
            return 'Asia'


for index, row in df.iterrows():
    source_id = row['source_id']
    language = row['language']
    row_entities = row['entities']
    for language, entities in row_entities.items():
        for entity in entities:
            if 'wikidata' not in entity['linkedData']:
                continue
            wikidata_id = entity['linkedData']['wikidata']['id']
            if wikidata_id in gnd_ids and gnd_ids[wikidata_id]:
                gnd_id = gnd_ids[wikidata_id]
                entity['linkedData']['gnd'] = {
                    "url": f"https://d-nb.info/gnd/{gnd_id}",
                    "id": gnd_id
                }
            if not entity['linkedData']['wikidata']['id']:
                entity['linkedData'].pop('wikidata')

            if wikidata_id in location_infos and location_infos[wikidata_id]:
                location = location_infos[wikidata_id]

                entity['country'] = location['iso'].upper()
                entity['continent'] = get_continent(location['continent'])

    assert row_entities
df.to_json(temp_result_file, index=False, orient='records')

# Merge entities of multiple properties to a single the source_id | language
df = pandas.read_json(temp_result_file, orient='records')
result_entities = {}
for index, row in tqdm(df.iterrows()):
    source_id = row['source_id']
    language = row['language']
    entities = row['entities'][language]

    if source_id not in result_entities:
        result_entities[source_id] = {}

    if language not in result_entities[source_id]:
        result_entities[source_id][language] = entities
    else:
        result_entities[source_id][language].extend(entities)

pandas_list = [[key, value] for key, value in tqdm(result_entities.items()) if value]
df_entities = pandas.DataFrame(pandas_list, columns=['source_id', 'entities'])
df_entities.to_json(result_file, index=False, orient="records")
