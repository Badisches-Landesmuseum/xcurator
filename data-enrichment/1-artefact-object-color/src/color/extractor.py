import logging
import multiprocessing
from operator import itemgetter
from typing import List

from PIL.Image import Image

from color.pil_extractor import PILColorExtractor
from color.repository import ColorRepository
from src.color.colorthief import ColorThief
from src.models.color import Color


class ColorExtractor:

    def __init__(self, color_repository: ColorRepository = ColorRepository()):
        self.__color_repository = color_repository
        self.__pil_extractor = PILColorExtractor(color_repository)

    def extract_colors(self, images: List[Image], color_count=20, quality: int = 1):
        logging.debug("extract colors of images: %s", images)
        pool = multiprocessing.Pool(processes=2 * multiprocessing.cpu_count())
        tasks = [pool.apply_async(self.extract_color, args=(image, color_count, quality)) for image in images]
        pool.close()
        pool.join()
        return [result.load() for result in tasks]

    def extract_background(self, images: List[Image]):
        logging.debug("extract colors of images: %s", images)
        pool = multiprocessing.Pool(processes=2 * multiprocessing.cpu_count())
        tasks = [pool.apply_async(self.extract_color, args=(image,)) for image in images]
        pool.close()
        pool.join()
        return [result.load() for result in tasks]

    def extract_color(self, image: Image, color_count=20, quality: int = 1):

        colorthief = ColorThief(image, self.__color_repository)
        try:
            color_palette = colorthief.get_color_palette(color_count, quality)
        except Exception as e:
            logging.error(f"unable to extract color of image {image}", e)
            color_palette = []

        color_palette.sort(key=lambda c: c.ratio, reverse=True)
        return color_palette

    @staticmethod
    def shiny_colors(color_palette: List[Color]) -> List[Color]:
        colors_by_hsv = {(color.hsv['h'], color.hsv['s'], color.hsv['v']): color for color in color_palette}
        colors_hsv = [hsv for hsv in list(colors_by_hsv.keys()) if hsv[1] > 20]
        res = sorted(colors_hsv, key=itemgetter(1), reverse=True)

        return [colors_by_hsv[hsv] for hsv in res]
