from pathlib import Path
from typing import Dict, List

import fast_colorthief
import numpy as np
import pytest
from PIL.Image import Image
from py_config import model_dir, resources_dir

from color.extractor import ColorExtractor
from color.hsv_repository import HSVRepository
from markdown_file_creator import MarkdownFileCreator
from models.color import Color
from segmentation.segmentor import ImageSegmentor


@pytest.fixture(scope='session')
def segmentor() -> ImageSegmentor:
    model_path = model_dir("u2net.pth")
    assert model_path.exists()
    return ImageSegmentor(model_path)


@pytest.fixture(scope='session')
def extractor() -> ColorExtractor:
    color_sheet_file = resources_dir("Farben.xlsx")
    # color_repository = ColorRepository(color_sheet=color_sheet_file, sheet_name="Sheet2")
    color_repository = HSVRepository()
    return ColorExtractor(color_repository)


def test_init(segmentor: ImageSegmentor, bug_images_base64: Dict, extractor):
    assert segmentor
    assert bug_images_base64
    assert extractor


def test_extraction(segmentor: ImageSegmentor, bug_images_base64: Dict, extractor: ColorExtractor):
    data = segmentor.extract_base64_masks(bug_images_base64)

    for index, item in enumerate(data):
        url = item['source']
        mask = item['mask']
        foreground = item['foreground']
        background = item['background']


        foreground_palette = extractor.extract_color(foreground, 7, 3)
        shiny_palette = extractor.shiny_colors(foreground_palette)
        background_palette = extractor.extract_color(background, 2, 10)
        background_palette = []

        title = Path(url).stem
        image = None

        _build_report(foreground, foreground_palette, background, background_palette, title)

def test_extraction_fast(segmentor: ImageSegmentor, bug_images_base64: Dict, extractor: ColorExtractor):
    data = segmentor.extract_base64_masks(bug_images_base64)

    for index, item in enumerate(data):
        url = item['source']
        mask = item['mask']
        foreground = item['foreground']
        background = item['background']

        arr = np.array(foreground)
        palette = fast_colorthief.get_palette(arr, color_count=7, quality=3)
        for color in palette:
            print(color)

        foreground_palette = extractor.extract_color(foreground, 7, 3)
        shiny_palette = extractor.shiny_colors(foreground_palette)
        background_palette = extractor.extract_color(background, 2, 10)
        background_palette = []

        title = Path(url).stem
        image = None

        _build_report(foreground, foreground_palette, background, background_palette, title)


def _build_report(foreground: Image, foreground_colors: List[Color], background: Image, background_color: List[Color],
                  title: str = ""):
    creator = MarkdownFileCreator()

    creator.add_subtitle(title)
    # creator.add_image_base64(image)

    # creator.add_subtitle("Mask")
    # creator.add_image_base64(mask)

    creator.add_subtitle("Foreground")
    creator.add_image_base64(foreground)
    for color in foreground_colors:
        creator.add_hex_color(color.hex, color.ratio, color.name)

    creator.add_subtitle("Background")
    creator.add_image_base64(background)
    for color in background_color:
        creator.add_hex_color(color.hex, color.ratio, color.name)

    creator.save_report(f"bug_{title}.md")

# @staticmethod
# def _build_report(image: Image, color_palette: List[Color], shine_palette: List[Color], file_name: str):
#     creator = MarkdownFileCreator()
#
#     creator.add_subtitle(file_name)
#     creator.add_image_base64(image)
#
#     creator.add_subtitle("Colors Palette")
#     for color in color_palette:
#         creator.add_hex_color(color.hex, color.ratio, color.name)
#
#     creator.add_subtitle("Shiny Color")
#     for color in shine_palette:
#         creator.add_hex_color(color.hex, color.ratio, color.name)
#
#     creator.save_report(f"color_palette_{file_name}.md")
#     # creator.save_report(f"color_palette_{image.filename}_{{:%Y_%m_%d_%H_
