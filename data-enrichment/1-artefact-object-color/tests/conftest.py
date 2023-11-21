import json
from pathlib import Path
from typing import List, Tuple, Dict

import pytest
from PIL.Image import Image
from py_config import resources_dir

from src.image_handler import ImageHandler


@pytest.fixture(scope='session')
def json_images() -> List[Image]:
    json_messages = resources_dir('test_messages.json', in_test_dir=True).read_text()
    messages = json.loads(json_messages)
    image_data = [message['data'] for message in messages]
    return [ImageHandler.load(base64) for base64 in image_data]


@pytest.fixture(scope='session')
def resource_images() -> List[Image]:
    image_files = resources_dir('images', in_test_dir=True).rglob("*.jpg")
    return [ImageHandler().load(file) for file in image_files]


@pytest.fixture(scope='session')
def bug_images() -> List[Image]:
    image_files = resources_dir('bug_images', in_test_dir=True).rglob("*.jpg")
    return [ImageHandler().load(file) for file in image_files]


@pytest.fixture(scope='session')
def bug_images_base64() -> Dict[str, str]:
    image_files = resources_dir('bug_images', in_test_dir=True).rglob("*.jpg")
    images = [ImageHandler().load(file) for file in image_files]
    return {image.filename: ImageHandler.to_base64(image) for image in images}


@pytest.fixture(scope='session')
def segmented_images() -> List[Tuple[Image, Path]]:
    image_files = resources_dir('images', in_test_dir=True).rglob("*.png")
    return [(ImageHandler().load(file, 'RGBA'), file) for file in image_files]
