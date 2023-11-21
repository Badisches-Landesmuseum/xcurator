import pytest
import json

from src.image_handler import ImageHandler
from py_config import resources_dir


@pytest.fixture(scope='session')
def images_base64() -> list[str]:
    json_messages = resources_dir(file_path='test_messages.json', in_test_dir=True).read_text()
    messages = json.loads(json_messages)
    return [message['data'] for message in messages]


def test_init(images_base64:list[str]):
    assert images_base64

    for image in images_base64:
        assert image.startswith("data")
        assert "base64" in image

def test_load_image(images_base64:list[str]):
    image_handler = ImageHandler()
    for base64 in images_base64:
        image = image_handler.load(base64)
        assert image
