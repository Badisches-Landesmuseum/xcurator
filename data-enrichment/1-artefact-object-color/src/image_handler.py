import base64
import io
import re
from io import BytesIO
from pathlib import Path
from typing import Union

import requests
from PIL import Image


class ImageHandler:
    """Component for accessing and preparing Images for inference"""

    @staticmethod
    def load(image_location: Union[str, bytes, Path, Image.Image], mode: str = 'RGB') -> Image:
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
                image.filename = 'image-url.jpg'
            elif image_location.startswith('data'):
                image_data = re.sub('^data:image/.+;base64,', '', image_location)
                image = Image.open(BytesIO(base64.b64decode(image_data)))
            elif isinstance(image_location, str):
                image_path = Path(image_location)
                image = Image.open(image_path)
                image.filename = str(image_location)
            else:
                raise ValueError("Unknown image format class " + image_location.__class__.__name__)
        except Exception as e:
            raise ValueError("Image can't be load! Did you referenced the image correctly? Error: " + str(e))

        if mode != image.mode:
            filename = image.filename
            image = image.convert(mode)
            image.filename = filename

        return image

    @staticmethod
    def load_base64(base64: str, filename: str):
        image = ImageHandler.load(base64)
        image.filename = filename
        return image

    @staticmethod
    def resize(image: Image, max_height=300, max_width=300) -> Image:
        image.thumbnail((max_height, max_width))
        return image

    @staticmethod
    def to_base64(image: Image) -> str:
        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        value = base64.b64encode(buffered.getvalue()).decode("utf-8", "ignore")
        return f"data:image/jpg;base64,{value}"
