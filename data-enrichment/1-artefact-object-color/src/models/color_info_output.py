from typing import List
from pydantic import Field, BaseModel

from src.models.color import Color


class ColorInfoOutput(BaseModel):
    foreground: List[Color] = Field(
        ...,
        example=[Color(rgb=(255, 255, 255), count=10, ratio=0.09)]
        , description="foreground-colors sorted by ratio"
    )
    background: List[Color] = Field(
        ...,
        example=[Color(rgb=(0, 0, 0), count=10, ratio=0.09)],
        description="background-colors sorted by ratio"
    )
    shiny: List[Color] = Field(
        ...,
        example=[Color(rgb=(0, 0, 0), count=10, ratio=0.09)],
        description="foreground-colors with a high satuation value"
    )
    mask: str = Field(
        ...,
        example="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDkAAAUUCAYAAADVy8lIA...",
        description="mask used for segmentation of back- and foreground."
    )
