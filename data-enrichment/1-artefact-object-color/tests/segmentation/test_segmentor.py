from pathlib import Path
from typing import List

import pytest
from PIL.Image import Image
from py_config import resources_dir, model_dir

from src.segmentation.segmentor import ImageSegmentor
from tests.markdown_file_creator import MarkdownFileCreator


@pytest.fixture(scope='session')
def segmentor():
    model_path = model_dir("u2net.pth")
    assert model_path.exists()
    return ImageSegmentor(model_path)


def test_init(segmentor: ImageSegmentor):
    assert segmentor


def test_extract_mask_torch_single(resource_images: List[Image], segmentor: ImageSegmentor):
    image = resource_images[0]
    masks = segmentor.extract_masks([image])
    assert masks


def test_bug_extract_mask_torch(bug_images: List[Image], segmentor: ImageSegmentor):
    masks = segmentor.extract_masks(bug_images)
    for index, data in enumerate(masks):
        image = data["image"]
        mask = data["mask"]
        foreground = data["foreground"]
        background = data["background"]

        title = f"image {index}"

        _safe_image(foreground, f"foreground-{index}")
        _safe_image(background, f"background-{index}")

        _build_report(image, mask, foreground, background, title)

def test_extract_mask_torch(resource_images: List[Image], segmentor: ImageSegmentor):
    masks = segmentor.extract_masks(resource_images)
    for index, data in enumerate(masks):
        image = data["image"]
        mask = data["mask"]
        foreground = data["foreground"]
        background = data["background"]

        title = f"image {index}"

        _safe_image(foreground, f"foreground-{index}")
        _safe_image(background, f"background-{index}")

        _build_report(image, mask, foreground, background, title)


# HELPER
def _safe_image(image: Image, title:str):
    images_dir = resources_dir("output", in_test_dir=True)
    file_name = f"{title}.png"
    image.save(images_dir.joinpath(file_name))


def _build_report(image: Image, mask: Image, foreground: Image, background: Image, title: str = ""):
    creator = MarkdownFileCreator()

    creator.add_subtitle(title)
    creator.add_image_base64(image)

    creator.add_subtitle("Mask")
    creator.add_image_base64(mask)

    creator.add_subtitle("Foreground")
    creator.add_image_base64(foreground)

    creator.add_subtitle("Background")
    creator.add_image_base64(background)

    creator.save_report(f"segmentation_{title}.md")
    # creator.save_file("reports/segmentation_" + image.filename + "_{:%Y_%m_%d_%H_%M_%S}".format(datetime.now()))
