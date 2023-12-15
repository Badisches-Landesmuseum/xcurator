import pytest

from ..src.ap import AP


@pytest.fixture
def ap() -> AP:
    return AP()


def test_import(ap):
    df = ap.get_data()

    assert len(df) > 0
