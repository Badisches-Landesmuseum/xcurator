from pathlib import Path
from typing import List, Tuple

import pytest
from PIL.Image import Image
from py_config import resources_dir

from color.repository import ColorRepository
from src.color.extractor import ColorExtractor
from src.models.color import Color
from tests.markdown_file_creator import MarkdownFileCreator


def test_init(resource_images: List[Image], segmented_images: List[Image]):
    assert resource_images
    assert segmented_images


@pytest.fixture(scope='session')
def markdown_creator() -> MarkdownFileCreator:
    return MarkdownFileCreator()


# resource_images -> conftest.py
def test_extract_all_colors(resource_images: List[Image]):
    color_extractor = ColorExtractor()
    for image in resource_images:
        color = color_extractor.extract_color(image=image, color_count=10)
        shiny = color_extractor.shiny_colors(color)

        _build_report(image, color, shiny, Path(image.filename).name)


def test_extract_all_colors_xcurator(resource_images: List[Image]):
    color_repository = ColorRepository(sheet_name="Sheet2", color_sheet=resources_dir("Farben.xlsx"))
    color_extractor = ColorExtractor(color_repository)
    for image in resource_images:
        color = color_extractor.extract_color(image=image, color_count=10)
        shiny = color_extractor.shiny_colors(color)

        _build_report(image, color, shiny, Path(image.filename).name)

# segmented_images -> conftest.py
def test_extract_segmented_colors(segmented_images: List[Tuple[Image, Path]]):
    color_extractor = ColorExtractor()
    for image, path in segmented_images:
        color = color_extractor.extract_color(image=image, color_count=10)
        shiny = color_extractor.shiny_colors(color)

        _build_report(image, color, shiny, path.name)


def _build_report(image: Image, color_palette: List[Color], shine_palette: List[Color], file_name: str):
    creator = MarkdownFileCreator()

    creator.add_subtitle(file_name)
    creator.add_image_base64(image)

    creator.add_subtitle("Colors Palette")
    for color in color_palette:
        creator.add_hex_color(color.hex, color.ratio, color.name)

    creator.add_subtitle("Shiny Color")
    for color in shine_palette:
        creator.add_hex_color(color.hex, color.ratio, color.name)

    creator.save_report(f"color_palette_{file_name}.md")
    # creator.save_report(f"color_palette_{image.filename}_{{:%Y_%m_%d_%H_%M_%S}}.md".format(datetime.now()))
