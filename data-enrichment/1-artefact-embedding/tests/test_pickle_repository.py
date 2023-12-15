import pytest

from PickleRepository import PickleRepository
from embeddings.image_encoder import ImageEncoder
from test_stubs.test_image_encoder import TestImageEncoder


@pytest.fixture
def repository() -> PickleRepository:
    repository = PickleRepository(sub_folder="unit_test")
    yield repository
    repository.remove()


@pytest.fixture
def encoder() -> ImageEncoder:
    return TestImageEncoder()


def test_init(repository):
    assert repository != 'undefined'


def test_path(repository):
    image_path = "example/images/test.jpg"

    pickle_path = repository.path(image_path)

    assert pickle_path.name == "test.pkl"


def test_path_url(repository):
    image_path = "http://photographs.500px.com/kyle/09-09-2013%20-%2015-47-571378756077.jpg"

    pickle_path = repository.path(image_path)

    assert pickle_path.name == "09-09-2013 - 15-47-571378756077.pkl"


def test_save(repository, encoder):
    image_path = "example/images/test.jpg"
    vector = encoder.predict(image_path)

    pickle_path = repository.safe(vector, image_path)

    assert pickle_path.name == "test.pkl"
    assert repository.exists(str(pickle_path))
