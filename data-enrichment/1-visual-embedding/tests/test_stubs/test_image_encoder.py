import logging
from pathlib import Path
from typing import Union

import numpy as np
from PIL.Image import Image
from numpy import float32, ndarray
from overrides import overrides
from torch import Tensor

from embeddings.image_encoder import ImageEncoder


class TestImageEncoder(ImageEncoder):

    def __init__(self, dimension: int = 640):
        super().__init__()

        self.embedder = None
        self.dimension = dimension

        logging.info(
            "ATTENTION: You are using a stub implementation of the image encoder so all generated embeddings are fake embeddings!")

    @overrides
    def predict(self, image_location: Union[str, Path, Image]) -> np.ndarray:
        return np.empty(self.dimension, dtype=float32)

    @overrides
    def predict_batch(self, batch: Tensor, ids: list[str] = None) -> ndarray:
        batch_size = batch.shape[0]
        return np.empty([batch_size, self.dimension], dtype=float32)
