# pylint: disable=redefined-outer-name
# ^^^ this

import pytest

from texts.open_clip_text_handler import OpenCLIPTextHandler
from texts.text_handler import TextHandler


@pytest.fixture()
def handler() -> TextHandler:
    return OpenCLIPTextHandler()


@pytest.fixture()
def example_texts() -> list[str]:
    return ["vase", "blue sky", "a longer example description of something nice in the 20er in germany"]


def test_init(example_texts: list[str], handler):
    assert len(example_texts) > 0
    assert handler != 'undefined'
    assert isinstance(handler, TextHandler)


def test_normalize(example_texts: list[str], handler):
    for text in example_texts:
        normalized_text = handler.normalize(text)
        assert normalized_text.size() == (77,)


def test_normalize_batch(example_texts: list[str], handler: TextHandler):
    normalized_text = handler.normalize_batch(example_texts)
    assert normalized_text.size() == (3, 77)


def test_single_batch(example_texts: list[str], handler):
    for text in example_texts:
        normalized_text = handler.single_batch(text)
        assert normalized_text.size() == (1, 77)
