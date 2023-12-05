import json
import os
import sys
import time
from pathlib import Path
from typing import Union, Dict, List

import pandas
from pandas import DataFrame
from py_config import data_dir
from tqdm import tqdm

from deepltranslator import DeeplTranslator


def previous_translated_entry(source_id: str, dataframe: Union[DataFrame, None]) -> Dict[str, Dict]:
    empty = {"title": {}, 'description': {}}
    if not isinstance(dataframe, DataFrame):
        return empty

    translated = dataframe.loc[dataframe['source_id'] == source_id]
    if len(translated) > 0:
        return translated.to_dict('records')[0]
    else:
        return empty


def translate_texts(translator: DeeplTranslator, artefact_corpus: DataFrame) -> DataFrame:
    total_entries = len(artefact_corpus)

    with tqdm(total=total_entries) as pbar:
        for index, row in artefact_corpus.iterrows():
            source_language = row['orig_language']

            title: dict = row['title']
            description: dict = row['description']

            languages_to_translate = [language for language in translator.languages() if language != source_language]

            for target_lang in languages_to_translate:
                if target_lang in title and title[target_lang]:
                    continue
                else:
                    title[target_lang] = translator.translate(source_language, target_lang, title[source_language])

            if description and source_language in description:
                for target_lang in languages_to_translate:
                    if target_lang in description:
                        continue
                    else:
                        description[target_lang] = translator.translate(source_language, target_lang,
                                                                         description[source_language])

            row['title'] = title
            row['description'] = description
            pbar.update(1)
    translator.safe()
    return artefact_corpus


def load_previous_corpus(languages: List[str] = ['de', 'nl', 'en']) -> Union[DataFrame, None]:
    previous_artefact_translation_json = list(data_dir().rglob("*artefact*.json"))
    if not previous_artefact_translation_json:
        return None

    previous_artefact_translation_json = previous_artefact_translation_json[0]

    df_translated = pandas.read_json(previous_artefact_translation_json)
    df_translated["source_id"] = df_translated['sourceInfo'].map(lambda x: x['id'])
    df_translated["orig_language"] = df_translated['sourceInfo'].map(lambda x: x['language'])

    cache = {}
    for language in languages:
        cache[language] = {}

    for index, row in df_translated.iterrows():
        source_lang = row['orig_language']
        title: dict = row['title']
        description: dict = row['description']

        languages_to_translate = [language for language in languages if language != source_lang]
        orig_title = title[source_lang]
        orig_description = description[source_lang] if source_lang in description else None

        for target_lang in languages_to_translate:
            if target_lang in title:
                if orig_title in cache[source_lang]:
                    cache[source_lang][orig_title][target_lang] = title[target_lang].strip()
                else:
                    cache[source_lang][orig_title] = {target_lang: title[target_lang].strip()}

            if description and target_lang in description:
                if orig_description in cache[source_lang]:
                    cache[source_lang][orig_description][target_lang] = description[target_lang.strip()]
                else:
                    cache[source_lang][orig_description] = {target_lang: description[target_lang.strip()]}

    for language, cache in cache.items():
        cache_json = data_dir(f"{language}_translations-new.json")
        with cache_json.open('w', encoding='UTF-8') as json_file:
            json.dump(cache, json_file)


def load_artefact_corpus() -> DataFrame:
    output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else Path('../../data')
    output_directory.mkdir(parents=True, exist_ok=True)

    corpus_files = list(output_directory.rglob("artefacts_core_*.json"))
    if not corpus_files:
        raise ValueError(
            f"No artefact corpus given. Please run the import script first or add the artefact json file inside the ouput data folder: {output_directory.absolute()}")

    artefact_corpus = pandas.read_json(corpus_files[0])
    artefact_corpus["source_id"] = artefact_corpus['sourceInfo'].map(lambda x: x['id'])
    artefact_corpus["orig_language"] = artefact_corpus['sourceInfo'].map(lambda x: x['language'])

    return artefact_corpus


def main():
    from datetime import datetime

    date_string = datetime.now().strftime("%Y-%m-%d")

    data_dir().mkdir(parents=True, exist_ok=True)
    output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else Path('../../data')
    output_directory.mkdir(parents=True, exist_ok=True)
    if (output_directory / Path(f'artefacts-translation_{date_string}.json')).exists():
        print(f"Translated corpus exist {(output_directory / Path(f'artefacts-translation_{date_string}.json'))}. skip translation")
        sys.exit(1)

    api_key = os.getenv("DEEPL_API_KEY")
    if not api_key:
        raise ValueError("No deepl api key available. Did you set the environment env 'DEEPL_API_KEY' properly?")

    translator = DeeplTranslator(api_key, ["de", "nl", "en"], cache_only=True)

    # Data
    # load_previous_corpus()
    artefact_corpus = load_artefact_corpus()

    print(f"Dry run of translation using only caching")
    translated_corpus = translate_texts(translator, artefact_corpus)

    print(f"Translation result: ")
    print(f"\t Chars to translate: {translator.missing_chars()}")
    print(f"\t Deepl API available Chars (included in your subscription plan): {translator.available_chars()}")

    if translator.missing_chars() > 0:
        print(f"The translation script will consume {translator.missing_chars()}")

        payed_chars_to_translate = translator.missing_chars() - translator.available_chars()
        if payed_chars_to_translate > 0:
            print(f"\t Expected costs (Sept. 2023): {(translator.calc_cost(payed_chars_to_translate))}")

        print("Script sleeps for 30 seconds, before continue the payed translation.")
        for remaining in range(30, 0, -1):
            sys.stdout.write("\r")
            sys.stdout.write("{:2d} seconds remaining.".format(remaining))
            sys.stdout.flush()
            time.sleep(1)

        print(f"Begin Translation:\n")
        translator = DeeplTranslator(api_key, ["de", "nl", "en"], cache_only=False)
        translated_corpus = translate_texts(translator, artefact_corpus)


    print("Update language caches")
    translator.safe()

    translated_corpus = translated_corpus[['source_id', 'title', 'description']].copy()
    translated_corpus.to_json((output_directory / Path(f"artefacts-translation_{date_string}.json")), orient="records")
    translated_corpus.head(10).to_json((output_directory / Path(f"artefacts-translation-small_{date_string}.json")), orient="records")


if __name__ == "__main__":
    main()
