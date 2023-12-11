import csv
import json
import os

import pandas
import pydantic_core
import torch
from py_config import read_app_config, model_dir, print_3pc_banner, data_dir
from tqdm import tqdm
from pathlib import Path

from color.extractor import ColorExtractor
from color.hsv_repository import HSVRepository
from image_handler import ImageHandler
from segmentation.segmentor import ImageSegmentor


def main():
    torch.cuda.empty_cache()
    print_3pc_banner()

    output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else data_dir()
    output_directory.mkdir(parents=True, exist_ok=True)

    print("""
    ###########################################################################
    # Image Segmentation (foreground | background) + Color palette extraction #
    ###########################################################################
    """)

    _app_config = read_app_config()

    # Segmentation Model
    filename = _app_config['model']['u2net']['filename']
    model_path = model_dir(filename)

    batch_size = int(_app_config['model']['u2net']['batch_size'])
    image_segmentor = ImageSegmentor(model_path, batch_size=batch_size)

    print(f"Running on device: {'cuda' if torch.cuda.is_available() else 'cpu'} | Batch size: {batch_size}")

    # Services
    image_handler = ImageHandler()
    color_repository = HSVRepository()
    color_extractor = ColorExtractor(color_repository)

    # Data
    csv_file = list(output_directory.rglob("*base64*.csv"))[0]
    print(f"using data from csv: {csv_file}")
    df = pandas.read_csv(csv_file)

    total = len(df.index)
    print(f"total: {total}")

    print("""
    reading data table csv: /data/*.csv"
    
    expected structure:
    +----------------------------------------------------------------+-----------------------------------------------------+
    |                              image_url                         |                        base64_image                 | 
    +----------------------------------------------------------------+-----------------------------------------------------+
    | https://example.com/image-1.jpg?width=400                      | data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQAB...  |
    | https://example.com/iiif/2/image-3.jpg/full/400,/0/default.jpg | data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQAB...  |
    | ...                                                            | ...                                                 |
    +----------------------------------------------------------------+-----------------------------------------------------+
    """)

    image_dict = dict(zip(df.image, df.base64))
    id_dict = dict(zip(df.image, df.source_id))

    data = image_segmentor.extract_base64_masks(image_dict)

    with open(str(output_directory / Path("xcurator-color-info.csv")), "a") as w:
        writer = csv.writer(w)
        writer.writerow(["source_id", "image", "foreground", "background", "shiny", "mask_base64"])
        with tqdm(total=total) as pbar:
            for index, item in enumerate(data):

                url = item['source']
                source_id = id_dict[url]
                mask = item['mask']
                foreground = item['foreground']
                background = item['background']

                foreground_palette = color_extractor.extract_color(foreground, 7, 3)
                shiny_palette = color_extractor.shiny_colors(foreground_palette)
                background_palette = color_extractor.extract_color(background, 2, 10)
                mask_base64 = image_handler.to_base64(mask)

                ## store
                foreground = json.dumps(foreground_palette, default=pydantic_core.to_jsonable_python)
                background = json.dumps(background_palette, default=pydantic_core.to_jsonable_python)
                shiny = json.dumps(shiny_palette, default=pydantic_core.to_jsonable_python)

                writer.writerow([source_id, url, foreground, background, shiny, mask_base64])

                del item
                del mask, foreground_palette, background_palette, shiny_palette
                del foreground, background, shiny, mask_base64

                if index % 100 == 0:
                    # Flush the output CSV file
                    w.flush()

                pbar.update(1)
        w.flush()
        w.close()


if __name__ == '__main__':
    import torch.multiprocessing as mp

    mp.set_start_method('spawn', force=True)
    main()
