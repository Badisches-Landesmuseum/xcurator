import open_clip
import torch
from overrides import overrides
from torch import Tensor

from texts.text_handler import TextHandler


class OpenCLIPTextHandler(TextHandler):
    """CLIP Text Handler for accessing and prepare texts for inference (NO TRAINING)"""

    def __init__(self) -> None:
        self._device = "cuda" if torch.cuda.is_available() else "cpu"

    @overrides
    def normalize(self, text: str) -> Tensor:
        """Preprocess normalization of an image (resize, coloring, ..) for inference)"""
        return open_clip.tokenize([text.strip()]).squeeze(0).to(self._device)

    @overrides
    def normalize_batch(self, texts: list[str]) -> Tensor:
        """Takes multiple text, returns a normalized text torch Tensor"""
        texts = [text.strip() for text in texts]
        return open_clip.tokenize(list(texts)).to(self._device)

    @overrides
    def dimension(self):
        """Dimension of the normalized Image"""
        return 3, 224, 224
