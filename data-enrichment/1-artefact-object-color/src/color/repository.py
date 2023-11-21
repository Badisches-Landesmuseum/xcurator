from pathlib import Path
from typing import Dict, Union, Tuple

import pandas as pd
from PIL import ImageColor
from webcolors import CSS3_HEX_TO_NAMES


class ColorRepository:

    def __init__(self, color_sheet: Path = None, sheet_name: str = None):
        if not color_sheet and not sheet_name:
            self._hex_colors = CSS3_HEX_TO_NAMES
        else:
            if not color_sheet.exists():
                raise ValueError("Excel sheet (%s) not exist", color_sheet)
            df = pd.read_excel(str(color_sheet), sheet_name)
            self._hex_colors = self._read_hex_color_palate(df)
        self._rgb_colors = self._parse_hex_to_rgb_colors(self._hex_colors)

    def _read_hex_color_palate(self, df) -> Dict[str, str]:
        _hex_colors_dict = dict()
        first_row = df.head(0).columns.tolist()
        for col_index in range(0, len(first_row), 2):
            color_name = first_row[col_index]
            nearest_colors = df[color_name].dropna()
            for nearest_color in nearest_colors:
                if self._is_hex(nearest_color):
                    _hex_colors_dict[nearest_color] = color_name
        return _hex_colors_dict

    def _parse_hex_to_rgb_colors(self, hex_colors: Dict[str, str]):
        return {ImageColor.getrgb(key): value for key, value in hex_colors.items()}

    def _is_hex(self, term: str) -> bool:
        return term.startswith('#')

    def __color_distance(self, c1, c2):
        return sum((l-r)**2 for l, r in zip(c1, c2))**0.5

    def nearest_rgb_color(self, rgb: Tuple[int, int, int]):
        colors = list(self._rgb_colors.keys())
        closest_colors = sorted(colors, key=lambda color: self.__color_distance(color, rgb))
        return closest_colors[0]

    def nearest_color_name(self, rgb: Tuple[int, int, int]) -> str:
        colors = list(self._rgb_colors.keys())
        closest_colors = sorted(colors, key=lambda color: self.__color_distance(color, rgb))
        return self._rgb_colors[closest_colors[0]]

    def count(self) -> int:
        return 0 if not self._hex_colors else len(self._hex_colors)

    def color_name(self, color: Union[str]) -> str:
        if self._is_hex(color) and color in self._hex_colors.keys():
            return self._hex_colors[color]
        else:
            return color

    def hex_color(self, color_name:str) -> str:
        if color_name not in self._hex_colors.values():
            raise ValueError("Unknown color (%s).", color_name)
        else:
            index = list(self._hex_colors.values()).index(color_name)
            return list(self._hex_colors.keys())[index]
