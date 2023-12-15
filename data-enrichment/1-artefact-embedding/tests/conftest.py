from pathlib import Path
from typing import Iterable

import pytest
from py_config import resources_dir


@pytest.fixture(scope='session')
def test_images() -> Iterable[Path]:
    return resources_dir("data", in_test_dir=True).rglob("*.jpg")
