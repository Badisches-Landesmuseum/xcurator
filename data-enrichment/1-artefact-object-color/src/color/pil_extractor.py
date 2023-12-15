from typing import List, Tuple

import PIL
import numpy as np
import scipy
import scipy.cluster
import scipy.misc
from PIL import Image
from PIL import Image
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min

from color.repository import ColorRepository
from models.color import Color


class PILColorExtractor:
    def __init__(self, color_name_finder: ColorRepository = ColorRepository()) -> None:
        self._name_finder = color_name_finder

    def get_color_palette(self, image: Image, color_count=10, quality=10) -> List[Color]:
        """Build a color palette and map to color model.  We are using the median cut algorithm to
        cluster similar colors.
        :param color_count: the size of the palette, max number of colors
        :param quality: quality settings, 1 is the highest quality, the bigger
                        the number, the faster the palette generation, but the
                        greater the likelihood that colors will be missed.
        :return list: a list of tuple in the form (r, g, b)
        """

        total_pixels = image.width * image.height
        palette = self.get_palette(image, color_count)
        # palette = self.get_palette_cluster(image, color_count)
        colors = [Color(rgb=rgb_value, count=pixel_count, ratio=round((pixel_count / total_pixels) * 100, 2),
                        name=self._name_finder.nearest_color_name(rgb_value)) for pixel_count, rgb_value in palette]
        colors = [color for color in colors if color.ratio > 0.0]
        return colors

    @staticmethod
    def get_palette(image, color_count: int) -> List[Tuple[int, List[int]]]:
        # p_foreground = image.convert("P", palette=PIL.Image.Palette.WEB)
        p_foreground = image.quantize(colors=256)
        p_foreground.resize((250,250))
        palette = p_foreground.getpalette()
        palette = [palette[3 * n:3 * n + 3] for n in range(256)]
        palette_weight = [color_count for color_count, rgb in p_foreground.getcolors()]
        palette_weight.extend([0] * (256 - len(palette_weight)))
        kmeans = KMeans(n_clusters=color_count, n_init=10, random_state=0, max_iter=1000)

        ar = np.asarray(palette).astype(float)
        ar_weight = np.asarray(palette_weight).astype(float)
        wt_kmeansclus= kmeans.fit(ar,sample_weight = ar_weight)
        predicted_kmeans = kmeans.predict(ar, sample_weight = ar_weight)
        closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, palette)

        colors = [palette[color_index] for color_index in closest]
        counts = [0] * color_count
        for count, color_index in zip(palette_weight, predicted_kmeans):
            counts[color_index] = counts[color_index] + count

        return zip(counts, colors)

    @staticmethod
    def get_palette_cluster(image, color_count: int) -> List[Tuple[int, List[int]]]:
        im = image.resize((200,  200))  # optional, to reduce time
        im = image.quantize(colors=256)
        ar = np.asarray(im)

        shape = ar.shape
        ar = ar.reshape(scipy.product(shape[:2]), shape[2]).astype(float)

        codes, dist = scipy.cluster.vq.kmeans(ar, color_count*2)
        test = []
        for code in codes:
            if code[3] < 200:
                test.append(code)
            else:
                continue


        vecs, dist = scipy.cluster.vq.vq(ar, test)  # assign codes
        counts, bins = scipy.histogram(vecs, len(test))  # count occurrences

        return [(count, color[:3]) for count, color in zip(counts, codes.astype(int))]