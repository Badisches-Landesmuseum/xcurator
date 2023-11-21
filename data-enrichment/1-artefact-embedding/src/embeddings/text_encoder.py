import logging
from typing import Iterator

import numpy as np
import torch
import torch.nn as nn
from overrides import EnforceOverrides
from torch import Tensor

from PickleRepository import PickleRepository
from texts.open_clip_text_handler import OpenCLIPTextHandler
from texts.text_handler import TextHandler


class TextEncoder(nn.Module, EnforceOverrides):

    def __init__(self, text_handler: TextHandler = OpenCLIPTextHandler(), cache: PickleRepository = None, ):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self._text_handler = text_handler
        self._cache = cache

        super().__init__()
        logging.info("Text Ender: %s  ( %s )", self.__class__.__name__, self.device)

    @torch.inference_mode()
    def predict(self, text: str) -> np.ndarray:
        text_batch = self._text_handler.single_batch(text).to(self.device)
        return self._embedder(text_batch).squeeze()

    def create_batch(self, data: list[str], batch_size: int = 32) -> Iterator[list[str]]:
        """Split list into the chucks

        Params:
            datas     (list): data that want to split into the chunk
            batch_size (int) : how much maximum data in each chunks

        Returns:
            chunks (obj): the chunk of list
        """
        for i in range(0, len(data), batch_size):
            yield data[i:i + batch_size]

    def predict_all(self, texts: list[str]) -> Iterator[np.ndarray]:
        batches = self.create_batch(texts)
        for batch in batches:
            normalized_batch = self._text_handler.normalize_batch(batch)
            embeddings = self.predict_batch(normalized_batch)
            for embedding in embeddings:
                yield embedding

    @torch.inference_mode()
    def predict_batch(self, batch: Tensor) -> np.ndarray:
        batch = batch.to(self.device)
        return self._embedder(batch)

    def dimension(self) -> int:
        input_image_dim = (77,)
        return self._embedder(torch.rand(*input_image_dim, device=self.device).unsqueeze(0)).shape[1]
