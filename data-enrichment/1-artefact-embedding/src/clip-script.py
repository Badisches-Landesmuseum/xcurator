from datetime import datetime
from typing import List

import os
import pandas
import torch
from py_config import print_3pc_banner, data_dir
from tqdm import tqdm
from pathlib import Path

from embeddings.OpenCLIP import OpenCLIP
from images.image_handler import ImageHandler

visual_model = OpenCLIP()
image_handler = ImageHandler()


def generate_embedding(base64_image: str) -> List[float]:
    image = image_handler.get(base64_image, mode="RGBA")
    embedding = visual_model.predict(image)
    return embedding.cpu().numpy().tolist()


def main():
    tqdm.pandas()
    torch.cuda.empty_cache()
    print_3pc_banner()

    output_directory = Path(os.getenv("OUTPUT_DIRECTORY")) if os.getenv("OUTPUT_DIRECTORY") else data_dir()
    output_directory.mkdir(parents=True, exist_ok=True)

    # Data
    csv_file = list(output_directory.rglob("*base64*.csv"))[0]
    print(f"using data from csv: {csv_file}")
    df = pandas.read_csv(csv_file)
    df = df[df['base64'].notnull()]

    total = len(df.index)
    print(f"total: {total}")

    date_string = datetime.now().strftime("%Y-%m-%d")

    df['embedding'] = df['base64'].progress_apply(generate_embedding)
    df.drop(columns=['base64'], inplace=True)
    df.to_json(output_directory / Path(f"xcurator-clip-embeddings-640_{date_string}.json"), orient="records")


if __name__ == '__main__':
    import torch.multiprocessing as mp

    mp.set_start_method('spawn', force=True)
    main()
