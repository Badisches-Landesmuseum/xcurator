import logging
from abc import abstractmethod
from multiprocessing import set_start_method, get_start_method
from pathlib import Path
from typing import Union

import torch
import torch.nn as nn
from PIL.Image import Image

from images.default_image_handler import DefaultImageHandler
from images.image_handler import ImageHandler


class ImageDecoder(nn.Module):

    def __init__(self, image_handler: ImageHandler = DefaultImageHandler()):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self._image_handler = image_handler
        if torch.cuda.is_available() and get_start_method(allow_none=True) != 'spawn':
            set_start_method("spawn")

        super().__init__()
        logging.info("Image Encoder: %s  ( %s ) | Handler: %s", self.__class__.__name__, self.device,
                     image_handler.__class__.__name__)

    @abstractmethod
    def decode(self, generated_data):
        logging.warning("not implemented yet")
        pass

    @torch.inference_mode()
    @torch.no_grad()
    def predict(self, image_location: Union[str, Path, Image]) -> str:

        image_batch = self._image_handler.single_batch(image_location)
        generated = self._model.generate(image_batch)
        return self.decode(generated)

    def dimension(self) -> int:
        input_image_dim = (3, 224, 224)
        return self._embedder(torch.rand(*input_image_dim, device=self.device).unsqueeze(0)).shape[1]
