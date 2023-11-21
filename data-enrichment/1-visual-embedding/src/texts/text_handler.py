from abc import ABC
from pathlib import Path
from typing import Union

from overrides import EnforceOverrides, final
from torch import Tensor


class TextHandler(EnforceOverrides, ABC):
    """Component for accessing and preparing Images for inference"""

    @final
    def get_text(self, text_file: Union[str, Path]) -> str:
        """Init a string from a file path"""
        if isinstance(text_file, str):
            text_file = Path(text_file)

        if not text_file.exists():
            raise ValueError("Text file in location %s not exist.", str(text_file))

        with open(text_file) as file:
            return file.read()

    def normalize(self, text: str) -> Tensor:
        """Takes a text, returns a normalized text torch Tensor"""
        pass

    def normalize_batch(self, texts: list[str]) -> Tensor:
        """Takes multiple text, returns a normalized text torch Tensor"""
        pass

    @final
    def single_batch(self, text: str) -> Tensor:
        """Takes a path, returns a normalized Text torch Tensor as single batch
         e.g.  dim (756) -> (1, 756)"""
        return self.normalize(text).unsqueeze(0)  # 4 dim (batch, channel, height, width)

    @final
    def single_file_batch(self, text_location: Union[str, Path]) -> Tensor:
        """Takes a path, returns a normalized Text torch Tensor as single batch
         e.g.  dim (756) -> (1, 756)"""
        text = self.get_text(text_location)
        return self.single_batch(text)

    def dimension(self):
        pass
