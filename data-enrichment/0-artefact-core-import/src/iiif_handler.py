import ast
import base64
import http
import logging
from pathlib import Path
from typing import Dict, Optional
from urllib import request

import pandas as pd
import requests
from more_itertools import sliced
from pandas import DataFrame
from py_config import data_dir
from tqdm import tqdm


class IIIFHandler:

    @staticmethod
    def size(iiif_url) -> Optional[Dict]:
        """request the image size (width, height) as json using the iiif info.json endpoint"""

        full_index = iiif_url.find("/full")
        info_url = f"{iiif_url[:full_index]}/info.json"
        response = requests.get(url=info_url)

        if response.status_code != 200:
            return None

        json_info = response.json()
        return {
            "width": json_info['width'],
            "height": json_info['height']
        }

    @staticmethod
    def base64(iiif_url) -> Optional[str]:
        """download and convert images as web-base64 strings"""

        try:
            base64_image = base64.b64encode(request.urlopen(iiif_url).read()).decode("utf-8")
            base_64_string = f"data:image/jpeg;base64,{base64_image}"
        except (http.client.IncompleteRead) as e:
            base64_image = base64.b64encode(e.partial).decode("utf-8")
            base_64_string = f"data:image/jpeg;base64,{base64_image}"
        except Exception as e:
            print(f"[{e.code}] -> {iiif_url}")
            return None

        return base_64_string

    @staticmethod
    def get_all_sizes(df: DataFrame, keep_batch_files: bool = True, batch_size: int = 1000) -> DataFrame:
        tqdm.pandas()
        IIIFHandler._get_all(df, "size", batch_size, IIIFHandler.size)
        return IIIFHandler._merge_batches("*-size-images.csv", keep_batch_files, converters={'size': ast.literal_eval})

    @staticmethod
    def get_all_base64_images(df: DataFrame, keep_batch_files: bool = True, batch_size: int = 100) -> DataFrame:
        tqdm.pandas()
        IIIFHandler._get_all(df, "base64", batch_size, IIIFHandler.base64)
        return IIIFHandler._merge_batches("*-base64-images.csv", keep_batch_files)

    @staticmethod
    def _merge_batches(glob_pattern: str, keep_batch_files: bool = True, converters=None) -> DataFrame:
        files = list(IIIFHandler._temp_directory().rglob(glob_pattern))
        df = pd.DataFrame()
        for file in files:
            try:
                data = pd.read_csv(file, converters=converters)
            except:
                logging.warning(f"Can't read file {file}")
                continue
            df = pd.concat([df, data], axis=0)
            if not keep_batch_files:
                file.unlink()
        return df

    @staticmethod
    def _temp_directory(file: str = None) -> Path:
        if file:
            temp_dir = data_dir(f"temp/{file}")
        else:
            temp_dir = data_dir("temp")

        return temp_dir

    @staticmethod
    def _get_all(df: DataFrame, name: str, batch_size: 1000, function):
        temp_dir = IIIFHandler._temp_directory()
        temp_dir.mkdir(parents=True, exist_ok=True)

        batches = sliced(range(len(df)), batch_size)

        for index in tqdm(batches):
            batch_file = IIIFHandler._temp_directory(f"{index.start}-{name}-images.csv")
            if batch_file.exists():
                continue

            df_slice = df.iloc[index]
            df_slice[name] = df_slice['image'].apply(function)
            df_slice.to_csv(batch_file, index=False)
