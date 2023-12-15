import pytest
from py_config import resources_dir

from ..src.blm import BLM


@pytest.fixture
def blm() -> BLM:
    return BLM()


def test_import(blm):
    df = blm.get_data()

    assert len(df) > 0


def test_import_with_country_data(blm):
    country_json = resources_dir('blm_objs_w_country.json')
    assert country_json.exists()

    df = blm.get_data(country_json)

    entry = df[df["sourceInfo"].str['id'] == '7F5336347A30469185F604665D4D6689']
    assert len(entry) == 1

    location = entry['locations'].iloc[0][0]
    assert location["continent"] == "EUROPA"
    assert location["country"] == "FR"
