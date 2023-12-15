from typing import Iterator

import numpy as np
import torch
import transformers
from multilingual_clip import pt_multilingual_clip
from overrides import overrides
from torch import Tensor

from PickleRepository import PickleRepository
from embeddings.text_encoder import TextEncoder
from texts.open_clip_text_handler import OpenCLIPTextHandler
from texts.text_handler import TextHandler


class OpenCLIPText(TextEncoder):
    """
    Multi modal Model to encode text and images

    Source: https://pypi.org/project/multilingual-clip/
    """

    def __init__(self, text_handler: TextHandler = OpenCLIPTextHandler(), cache: PickleRepository = None,
                 text_encoder=None):
        super().__init__(text_handler, cache)
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        model_name = 'M-CLIP/XLM-Roberta-Large-Vit-B-16Plus'

        self.model = pt_multilingual_clip.MultilingualCLIP.from_pretrained(model_name)
        self._tokenizer = transformers.AutoTokenizer.from_pretrained(model_name)
        self._embedder = self.model.forward
        self.model.eval()

    @overrides
    def predict(self, text: str) -> np.ndarray:
        return self.predict_text_batch([text])[0]

    @overrides
    def predict_all(self, texts: list[str]) -> Iterator[np.ndarray]:
        batches = self.create_batch(texts)
        for batch in batches:
            embeddings = self.predict_text_batch(batch)
            for embedding in embeddings:
                yield embedding

    @overrides
    def predict_batch(self, batch: Tensor) -> np.ndarray:
        raise ValueError("This TextEncoder does only support patch_text_batch")

    def predict_text_batch(self, texts: list[str]) -> np.ndarray:
        embeddings = self._embedder(texts, self._tokenizer)
        return embeddings.detach().numpy()

    @overrides
    def dimension(self) -> int:
        return self._embedder(["dog"], self._tokenizer).shape[1]
