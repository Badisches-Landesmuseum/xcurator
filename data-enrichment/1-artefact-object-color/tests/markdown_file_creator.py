import base64
from io import BytesIO
from typing import Union

from PIL.Image import Image
from py_config import resources_dir


class MarkdownFileCreator:
    output_lines: [str]

    def __init__(self):
        self.output_lines = []

    def add_title(self, title):
        self.output_lines.append("# " + str(title))

    def add_text(self, text):
        self.output_lines.append(str(text))

    def add_subtitle(self, subtitle):
        self.output_lines.append("### " + str(subtitle))

    def add_image(self, image_path):
        self.output_lines.append('<img src="' + image_path.replace("resources", "..") + '" alt="image" width="400"/>')
        self.output_lines.append('')

    def add_image_base64(self, image: Union[Image, str]):
        if isinstance(image, Image):
            image = self.image_2_base64(image)

        self.output_lines.append(f'<img src="{image}" alt="image" width="400"/>')
        self.output_lines.append('')

    def add_hex_color(self, hex, ratio=None, name=None):
        text = "- ![#69adff](https://via.placeholder.com/15/" + hex[1:] + "/000000?text=+) `" + hex + "`"
        if ratio:
            text = text + " ratio: " + str(ratio)
        if name:
            text = text + " name: " + str(name)
        self.add_text(text)

    def write_file(self, file_path):
        with open(file_path, 'w') as filehandle:
            for line in self.output_lines:
                filehandle.write('%s\n' % line)

    def save_report(self, file_name: str):
        if not file_name.endswith(".md"):
            file_name = f"{file_name}.md"

        reports_dir = resources_dir("reports", in_test_dir=True)
        path = reports_dir.joinpath(file_name)
        f = open(path, "a")
        self.write_file(path)
        f.close()

    def image_2_base64(self, image: Image) -> str:
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        value = base64.b64encode(buffered.getvalue()).decode("utf-8", "ignore")
        return f"data:image/png;base64,{value}"
