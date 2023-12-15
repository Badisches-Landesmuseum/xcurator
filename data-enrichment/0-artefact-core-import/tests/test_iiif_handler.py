import pandas
from py_config import resources_dir

from ..src.iiif_handler import IIIFHandler


def test_size():
    image_url = "https://data.landesmuseum.de/iiif/3/71D5F97E108446D598053E0407FD105D_000/full/!360,360/0/default.jpg"

    size = IIIFHandler.size(image_url)
    assert size
    assert size["width"] == 1000
    assert size["height"] == 989


def test_base64():
    image_url = "https://data.landesmuseum.de/iiif/3/71D5F97E108446D598053E0407FD105D_000/full/!360,360/0/default.jpg"

    base64_image = IIIFHandler.base64(image_url)
    assert base64_image
    assert base64_image.startswith("data:image")


def test_get_all_sizes():
    sample = resources_dir("images-sample.json", in_test_dir=True)
    df_images = pandas.read_json(sample)
    df_sizes = IIIFHandler.get_all_sizes(df_images, keep_batch_files=False, batch_size=1)

    assert len(df_sizes) == 5
    sizes = df_sizes['size'].tolist()
    widths = [size['width'] for size in sizes]
    heights = [size['height'] for size in sizes]
    assert [width for width in widths if width > 300]
    assert [height for height in heights if height > 300]


def test_get_all_base64():
    sample = resources_dir("images-sample.json", in_test_dir=True)
    df_images = pandas.read_json(sample)
    df_base64 = IIIFHandler.get_all_base64_images(df_images, keep_batch_files=False, batch_size=1)

    assert len(df_base64) == 5
    images = df_base64['base64'].tolist()
    for image in images:
        assert image.startswith("data:image")
