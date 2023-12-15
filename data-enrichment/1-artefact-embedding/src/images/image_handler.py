import io
from abc import ABC
from pathlib import Path
from typing import Union
import re
from io import BytesIO
import base64
import requests
from PIL import Image
from overrides import EnforceOverrides, final
from torch import Tensor


class ImageHandler(EnforceOverrides, ABC):
    """Component for accessing and preparing Images for inference"""

    @final
    def get(self, image_location: Union[str, bytes, Path, Image.Image], mode: str = 'RGB') -> Image:
        """Init an PIL Image from a URL or file path in RGB mode"""
        try:
            if isinstance(image_location, Image.Image):
                image = image_location
            elif isinstance(image_location, bytes):
                image = Image.open(io.BytesIO(image_location))
            elif isinstance(image_location, Path):
                image = Image.open(image_location)
                image.filename = str(image_location)
            elif image_location.startswith('http'):
                image_request = requests.get(image_location, stream=True, headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:16.0) Gecko/20100101 Firefox/16.0,gzip(gfe)'})
                image = Image.open(image_request.raw)
                image.filename = image_location
            elif image_location.startswith('data'):
                image_data = re.sub('^data:image/.+;base64,', '', image_location)
                image = Image.open(BytesIO(base64.b64decode(image_data)))
            elif isinstance(image_location, str):
                image_path = Path(image_location)
                image = Image.open(image_path)
            else:
                raise ValueError("Unknown image format class " + image_location.__class__.__name__)
        except Exception as e:
            raise ValueError("Image can't be load! Did you referenced the image correctly? Error: " + str(e))

        if mode != image.mode:
            image = image.convert(mode)

        return image

    def normalize(self, image: Image) -> Tensor:
        """Takes a PIL Image, returns a normalized Image torch Tensor"""
        pass

    @final
    def single_batch(self, image_location: Union[str, bytes, Image.Image, Path]) -> Tensor:
        """Takes path, url string or base64 bytes image, returns a normalized Image torch Tensor as single batch
         e.g.  dim (3,224,224) -> (1, 3, 224, 224)"""
        image = self.get(image_location)
        return self.normalize(image).unsqueeze(0)  # 4 dim (batch, channel, height, width)

    def dimension(self):
        pass

    def set_preprocess(self, preprocess) -> None:
        pass

