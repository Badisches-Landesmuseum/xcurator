from functools import lru_cache
from typing import Iterator

import numpy as np
import transformers
from multilingual_clip import pt_multilingual_clip


class OpenCLIPText:
    """
    Multi modal Model to encode text and images

    Source: https://pypi.org/project/multilingual-clip/
    """

    def __init__(self):
        self.device = "cpu"

        model_name = 'M-CLIP/XLM-Roberta-Large-Vit-B-16Plus'
        self.model = pt_multilingual_clip.MultilingualCLIP.from_pretrained(model_name)
        self._tokenizer = transformers.AutoTokenizer.from_pretrained(model_name)

        self._embedder = self.model.forward
        self.model.eval()

    @lru_cache(maxsize=300)
    def predict(self, text: str) -> np.ndarray:
        return self.predict_text_batch([text])[0]

    def predict_all(self, texts: list[str]) -> Iterator[np.ndarray]:
        batches = self.create_batch(texts)
        for batch in batches:
            embeddings = self.predict_text_batch(batch)
            for embedding in embeddings:
                yield embedding

    def predict_text_batch(self, texts: list[str]) -> np.ndarray:
        embeddings = self._embedder(texts, self._tokenizer)
        return embeddings.detach().numpy()

    def dimension(self) -> int:
        return self._embedder(["dog"], self._tokenizer).shape[1]

    @staticmethod
    def create_batch(data: list[str], batch_size: int = 32) -> Iterator[list[str]]:
        """Split list into the chucks

        Params:
            datas     (list): data that want to split into the chunk
            batch_size (int) : how much maximum data in each chunks

        Returns:
            chunks (obj): the chunk of list
        """
        for i in range(0, len(data), batch_size):
            yield data[i:i + batch_size]
