import colorsys
from typing import Tuple

import numpy as np
import scipy.spatial.distance


class HSVRepository:
    color_names = [
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Turquoise",
        "Blue",
        "Purple",
        "HotPink",
        "SaddleBrown",
        "Gray",
        "White",
        "Black",
    ]

    palette = np.array([
        [0, 100, 100],
        [39, 100, 100],
        [60, 100, 100],
        [120, 100, 50],
        [174, 71, 88],
        [240, 100, 100],
        [300, 100, 50],
        [330, 59, 100],
        [30, 70, 26],
        [0, 0, 60],
        [0, 0, 100],
        [240, 5, 15]
    ])

    def nearest_color_name(self, rgb: Tuple[int, int, int]) -> str:
        float_rgb = tuple(x / 255 for x in rgb)
        h, s, v = colorsys.rgb_to_hsv(*float_rgb)
        image_color = np.array([[int(h * 360), int(s * 100), int(v * 100)]])
        closest_idx = scipy.spatial.distance.cdist(image_color, self.palette).argmin(1).item()
        return self.color_names[closest_idx]
