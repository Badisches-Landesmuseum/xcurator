import colorsys
from math import sqrt
from typing import Tuple, Optional, Dict

from pydantic import BaseModel, NonNegativeInt, Field, NonNegativeFloat, computed_field


class Color(BaseModel):
    rgb: Tuple[int, int, int]
    count: NonNegativeInt = Field(0, example=424, description="Amount of pixels")
    ratio: NonNegativeFloat = Field(0.0, example=0.45,
                                    description="ratio of full image pixel count compared to color pixel count")
    name: Optional[str] = Field(None, example="blue", description="color name")

    @computed_field
    @property
    def hex(self) -> str:
        return "#{:02x}{:02x}{:02x}".format(self.rgb[0], self.rgb[1], self.rgb[2])

    @computed_field
    @property
    def hsv(self) -> Dict[str, int]:
        float_rgb = tuple(x/255 for x in self.rgb)
        h, s, v = colorsys.rgb_to_hsv(*float_rgb)
        return {"h": int(h * 360), "s": int(s * 100), "v": int(v * 100)}

    def distance(self, rgb: Tuple[int, int, int]):
        (r1, g1, b1) = self.rgb
        (r2, g2, b2) = rgb
        return sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
