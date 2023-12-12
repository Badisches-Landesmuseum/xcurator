import ast
import json
import os
from datetime import datetime
from pathlib import Path

import pandas
from py_config import print_3pc_banner


def convert(entry):
    try:
        return ast.literal_eval(entry)
    except:
        return json.loads(entry, strict=False)


def main():
    print_3pc_banner()
    date_string = datetime.now().strftime("%Y-%m-%d")

    print("""
        ##########################################
        # xCurator finalize Dataset              #
        ##########################################
    """)

    output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else Path('../../data')
    output_directory.mkdir(parents=True, exist_ok=True)

    core_file = list(output_directory.rglob("*core_*.json"))[0]
    artefact_corpus = pandas.read_json(core_file)
    print(f"available artefacts: {len(artefact_corpus)}")

    artefact_corpus["source_id"] = artefact_corpus['sourceInfo'].map(lambda x: x['id'])



    """
        TEXT BASED ENRICHMENT
    """
    # Translations
    translation_file = list(output_directory.rglob("*translation_*.json"))[0]
    translation_corpus = pandas.read_json(translation_file)
    artefact_corpus.drop(columns=["title", "description"], inplace=True)
    artefact_corpus = artefact_corpus.merge(translation_corpus, left_on='source_id', right_on='source_id', how="left")

    # Linked - Named Entities
    entities_file = list(output_directory.rglob("*entities_*.json"))[0]
    df_entities = pandas.read_json(entities_file, orient='records')
    artefact_corpus = artefact_corpus.merge(df_entities, left_on='source_id', right_on='source_id', how="left")

    """
        IMAGE BASED ENRICHMENT
    """
    # Visual Embedding (Clip)
    embedding_file = list(output_directory.rglob("*embeddings*.json"))[0]
    clip_corpus = pandas.read_json(embedding_file, orient='records')
    clip_corpus.drop_duplicates(subset=['source_id'], keep='first', inplace=True)
    clip_corpus.drop(columns=["image"], inplace=True)
    artefact_corpus = artefact_corpus.merge(clip_corpus, left_on="source_id", right_on="source_id", how="left")
    print(f"Artefacts cleaned by embedding: {len(artefact_corpus)}")

    # Color
    def filter_by_ratio(item):
        colors = ast.literal_eval(item)
        colors = [color for color in colors if color['ratio'] > 10]
        return colors

    color_file = list(output_directory.rglob("*color*.csv"))[0]
    color_corpus = pandas.read_csv(color_file)
    color_corpus.drop_duplicates(subset=['source_id'], keep='first', inplace=True)
    color_corpus.loc[color_corpus["foreground"].str.len() == 2, 'foreground'] = \
        color_corpus[color_corpus["foreground"].str.len() == 2]['background']
    color_corpus = color_corpus.drop(columns=["background", "shiny", "mask_base64"])
    color_corpus['foreground'] = color_corpus['foreground'].apply(filter_by_ratio)
    color_corpus = color_corpus.rename(columns={'foreground': 'object-color'})

    artefact_corpus = artefact_corpus.merge(color_corpus, left_on="source_id", right_on="source_id", how="left")
    print(f"Artefacts cleaned by color: {len(artefact_corpus)}")

    # ids
    id_file = list(data_dir().rglob("*_ids.csv"))[0]
    id_corpus = pandas.read_csv(id_file)
    id_corpus['_id'] = id_corpus['_id'].apply(lambda elem: {"$oid": elem})
    artefact_corpus = artefact_corpus.merge(id_corpus, left_on="source_id", right_on="sourceInfo.id", how="left")
    artefact_corpus.drop(columns=["sourceInfo.id"], inplace=True)

    artefact_corpus.drop(columns=["source_id", "image"], inplace=True)
    artefact_corpus.to_json(output_directory / Path(f"xcurator_artefacts-full-data-{date_string}.json"), orient='records')
    artefact_corpus.head(10).to_json(output_directory / Path(f"xcurator-artefacts-full-data-small_{date_string}.json"), orient='records')

    print(f"available artefacts: {len(artefact_corpus)}")


if __name__ == "__main__":
    main()
