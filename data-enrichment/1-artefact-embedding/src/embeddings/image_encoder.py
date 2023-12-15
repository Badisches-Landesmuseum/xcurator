import logging
from multiprocessing import set_start_method, get_start_method
from pathlib import Path
from typing import Iterator, Union

import numpy as np
import torch
import torch.nn as nn
from PIL.Image import Image
from torch import Tensor
from torch.utils.data import DataLoader

from PickleRepository import PickleRepository
from images.default_image_handler import DefaultImageHandler
from images.image_handler import ImageHandler


class ImageEncoder(nn.Module):

    def __init__(self, image_handler: ImageHandler = DefaultImageHandler(), cache: PickleRepository = None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self._image_handler = image_handler
        self._cache = cache
        if torch.cuda.is_available() and get_start_method(allow_none=True) != 'spawn':
            set_start_method("spawn")

        super().__init__()
        logging.info("Image Encoder: %s  ( %s ) | Handler: %s | Cache: %s", self.__class__.__name__, self.device,
                     image_handler.__class__.__name__, str(cache is not None))

    @torch.inference_mode()
    @torch.no_grad()
    def predict(self, image_location: Union[str, Path, Image]) -> np.ndarray:
        if self._cache and self._cache.exists(image_location):
            return self._cache.get(image_location)

        image_batch = self._image_handler.single_batch(image_location)
        embedding = self._embedder(image_batch).squeeze()

        if self._cache:
            self._cache.safe(embedding, image_location)

        return embedding

    def predict_all(self, image_locations: Iterator[Union[str, Path]]) -> np.ndarray:
        from images.image_dataset import ImageDataset  # due to circular dependency

        data_set = ImageDataset(image_locations, image_handler=self._image_handler)
        num_gpus = torch.cuda.device_count()
        loader = DataLoader(data_set, batch_size=9, num_workers=4*num_gpus)
        for images, ids in loader:
            ids = list(ids)
            is_cached = self._cache and all([self._cache.exists(id) for id in ids])
            if is_cached:
                for id in ids:
                    yield id, self._cache.get(id)
            else:
                embeddings = self.predict_batch(images, ids)
                for id, embedding in zip(ids, embeddings):
                    if self._cache:
                        self._cache.safe(embedding.reshape(-1), id)
                    yield id, embedding

    @torch.inference_mode()
    @torch.no_grad()
    def predict_batch(self, batch: Tensor, ids: list[str] = None) -> np.ndarray:
        with torch.cuda.amp.autocast():
            return  self._embedder(batch)

    def dimension(self) -> int:
        input_image_dim = (3, 224, 224)
        return self._embedder(torch.rand(*input_image_dim, device=self.device).unsqueeze(0)).shape[1]
