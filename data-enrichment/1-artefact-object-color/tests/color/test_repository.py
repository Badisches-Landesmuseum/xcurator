from pathlib import Path

import pytest

from src.color.repository import ColorRepository
from py_config import resources_dir


@pytest.fixture(scope='session')
def excel_sheet() -> Path:
    return resources_dir("Farben.xlsx")


@pytest.fixture(scope='session')
def excel_sheet_name() -> str:
    return "Sheet2"


@pytest.fixture(scope='session')
def repository(excel_sheet, excel_sheet_name) -> ColorRepository:
    return ColorRepository(excel_sheet, excel_sheet_name)


def test_init(excel_sheet, excel_sheet_name, repository):
    assert excel_sheet
    assert excel_sheet_name
    assert excel_sheet.exists()
    assert repository
    assert repository.count() > 0
    assert ColorRepository()


def test_nearest_color(repository):
    color = repository.nearest_rgb_color((0, 0, 0))
    assert color
