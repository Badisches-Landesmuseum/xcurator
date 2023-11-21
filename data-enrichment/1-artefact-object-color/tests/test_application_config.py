from typing import Any, Dict

import pytest
from py_config import read_app_config

from py_config  import resources_dir


@pytest.fixture(scope='session')
def app_config() -> Dict[str, Any]:
    config = resources_dir("application.yml")
    return read_app_config(str(config))

def test_app_config(app_config: Dict[str, Any]):
    assert app_config
    assert app_config['app']
    assert app_config['app']['name']

def test_kafka_config(app_config: Dict[str, Any]):
    assert app_config
    assert app_config['kafka']
    assert app_config['kafka']['bootstrap-servers']
