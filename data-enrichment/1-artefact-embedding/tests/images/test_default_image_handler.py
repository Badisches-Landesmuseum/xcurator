# pylint: disable=redefined-outer-name
# ^^^ this
from pathlib import Path

import pytest
from PIL import Image
from py_config import resources_dir

from images.default_image_handler import DefaultImageHandler
from images.image_handler import ImageHandler


@pytest.fixture()
def handler() -> ImageHandler:
    return DefaultImageHandler()


@pytest.fixture()
def image_location() -> Path:
    return resources_dir("data/affe.jpg", in_test_dir=True)


def test_init(image_location, handler):
    assert image_location.exists()
    assert handler != 'undefined'
    assert isinstance(handler, DefaultImageHandler)


def test_load(image_location: Path, handler):
    image = handler.get(image_location=image_location)
    assert image.width > 0
    assert image.height > 0


def test_normalize(image_location: Path, handler):
    image = Image.open(image_location)
    normalized_image = handler.normalize(image)

    assert normalized_image.size() == (3, 224, 224)


def test_single_batch(image_location: Path, handler):
    single_batch = handler.single_batch(image_location)

    assert single_batch.size() == (1, 3, 224, 224)
