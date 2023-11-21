import logging
from typing import List

import pytest

from embeddings.image_decoder import ImageDecoder
from generate.coca_decoder import CocaDecoder
from image import Image


@pytest.fixture()
def decoder() -> ImageDecoder:
    return CocaDecoder()


def test_init(decoder):
    assert decoder


def test_generate_titel(decoder:ImageDecoder, test_images:List[Image]):
    for image in test_images:
        title = decoder.predict(image)
        logging.info(title)
