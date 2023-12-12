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


def translate_texts(translator: DeeplTranslator, artefact_corpus: DataFrame, cache_only=False) -> DataFrame:
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
                    translated_text = translator.translate(source_language, target_lang, title[source_language])
                    if not cache_only:
                        title[target_lang] = translated_text

            if description and source_language in description:
                for target_lang in languages_to_translate:
                    if target_lang in description:
                        continue
                    else:
                        translated_text = translator.translate(source_language, target_lang,
                                                               description[source_language])
                        if not cache_only:
                            description[target_lang] = translated_text
            if not cache_only:
                row['title'] = title
                row['description'] = description
            pbar.update(1)
    if not cache_only:
        translator.safe()
    return artefact_corpus


def load_artefact_corpus() -> DataFrame:
    output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else data_dir()
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
        print(
            f"Translated corpus exist {(output_directory / Path(f'artefacts-translation_{date_string}.json'))}. skip translation")
        sys.exit(1)

    api_key = os.getenv("DEEPL_API_KEY")
    if not api_key:
        raise ValueError("No deepl api key available. Did you set the environment env 'DEEPL_API_KEY' properly?")

    translator = DeeplTranslator(api_key, ["de", "nl", "en"], cache_only=True)

    # Data
    artefact_corpus = load_artefact_corpus()

    print(f"Dry run of translation using only caching")
    translated_corpus = translate_texts(translator, artefact_corpus, cache_only=True)

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
    else:
        print(f"Cache contains all translation data.")
    print(f"Begin Translation:\n")
    translator = DeeplTranslator(api_key, ["de", "nl", "en"], cache_only=False)
    translated_corpus = translate_texts(translator, artefact_corpus, cache_only=False)

    print("Update language caches")
    translator.safe()

    translated_corpus = translated_corpus[['source_id', 'title', 'description']].copy()
    translated_corpus.to_json((output_directory / Path(f"artefacts-translation_{date_string}.json")), orient="records")


if __name__ == "__main__":
    main()
