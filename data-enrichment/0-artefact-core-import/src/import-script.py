import ast
import os
from datetime import datetime
from pathlib import Path

import pandas
from py_config import print_3pc_banner, resources_dir
from tqdm import tqdm

from ap import AP
from blm import BLM
from iiif_handler import IIIFHandler


def import_code():
    print_3pc_banner()

    tqdm.pandas()
    output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else Path('../data')
    output_directory.mkdir(parents=True, exist_ok=True)

    date_string = datetime.now().strftime("%Y-%m-%d")

    """
        CORE DATA
    """
    print("## Fetch raw data")
    artefacts_file = output_directory / Path(f"artefacts_core_{date_string}.json")
    if not artefacts_file.exists():
        print("Import the dataset of Badisches Landesmuseum")
        continent_file = resources_dir("blm_objs_w_country.json")
        blm_artefacts = BLM().get_data(continent_json=continent_file)
        print(f"\t Got {len(blm_artefacts)} artefacts.")

        print("Import the dataset of Allard Pierson")
        ap_artefacts = AP().get_data()
        print(f"\t Got {len(ap_artefacts)} artefacts.")

        artefacts = pandas.concat([blm_artefacts, ap_artefacts])
        artefacts.to_json(artefacts_file, orient="records")
    else:
        print("\tCached Import of raw artefacts found. skip requesting apis.")
        artefacts = pandas.read_json(artefacts_file)

    print(f"\tThe dataset contains {len(artefacts)} artefacts.\n")



    """
        IMAGE DATA
    """
    print("## Construct image corpus.")
    images_file = output_directory / Path(f"artefacts_images.csv")
    if not images_file.exists():
        df_images = pandas.DataFrame()
        df_images['image'] = artefacts['images']
        df_images['source_id'] = artefacts['sourceInfo'].str['id']
        df_images = df_images.explode("image")
        df_images['image'] = df_images['image'].str['url']
        df_images.to_csv(images_file, index=False)
    else:
        df_images = pandas.read_csv(images_file)
    print(f"\tThe dataset  contains {len(df_images)} images.\n")


    print("## Prepare base64 image corpus.")
    image_base64_file = output_directory / Path(f"artefact_image_base64.csv")
    if not image_base64_file.exists():
        print("\tDownload images and store as base64. (this takes a while)")
        print("\tNote: this process can be interrupted and continued later\n")
        df_base64 = IIIFHandler.get_all_base64_images(df_images)
        df_base64.to_csv(image_base64_file)
    else:
        print("\tCached corpus found. skip downloading.\n")
        df_base64 = pandas.read_csv(image_base64_file)

    print("## Fetch image sizes.")
    image_sizes_file = output_directory / Path(f"artefact_image_size.csv")
    if not image_sizes_file.exists():
        print("\tRequest images sizes. (this takes a while)")
        print("\tNote: this process can be interrupted and continued later")
        df_sizes = IIIFHandler.get_all_sizes(df_images)
        df_sizes.to_csv(image_sizes_file)
    else:
        print("\tCached sizes found. skip fetching.")
        df_sizes = pandas.read_csv(image_sizes_file)
        df_sizes = df_sizes[df_sizes['size'].notnull()]

    """
        CLEAN UP
    """
    print("\n## Clean up unreachable images and add image sizes")
    all_urls = df_images['image'].tolist()
    base64_urls = df_base64['image'].tolist()
    size_urls = df_sizes['image'].tolist()
    missing_base_urls = list(set(all_urls) - set(base64_urls))
    missing_size_urls = list(set(all_urls) - set(size_urls))
    missing_urls = list(set(missing_base_urls + missing_size_urls))

    df_sizes['size'] = df_sizes['size'].apply(ast.literal_eval)
    image_sizes = dict(zip(df_sizes['image'],df_sizes['size']))
    for index, row in tqdm(artefacts.iterrows(), total=len(artefacts)):
        images = row['images']
        cleaned = [image for image in images if image['url'] not in missing_urls]
        if len(cleaned) == 0:
            row['images'] = None
            continue
        for image in cleaned:
            image.update(image_sizes[image['url']])
        row['images'] = cleaned

    artefacts = artefacts[artefacts['images'].notnull()]
    print(f"Dataset contains finally {len(artefacts)} artefacts.")
    artefacts.to_json(artefacts_file, orient="records")


if __name__ == "__main__":
    import_code()
