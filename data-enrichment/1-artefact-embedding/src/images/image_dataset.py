from pathlib import Path
from typing import Tuple, Iterator, Union

import torch
from torch import Tensor
from torch.utils.data import Dataset

from PickleRepository import PickleRepository
from images.default_image_handler import DefaultImageHandler
from images.image_handler import ImageHandler


class ImageDataset(Dataset):
    """Component to get batched access to a list of image data sources (url, paths)"""

    def __init__(self, image_locations: Iterator[Union[str, Path]], batch_size=24,
                 image_handler: ImageHandler = DefaultImageHandler(),
                 cache: PickleRepository = None):
        self._batch_size = batch_size
        self._image_locations = [image_location for image_location in list(str(path) for path in image_locations)]
        self._cache = cache
        self._image_handler = image_handler
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    def __len__(self):
        """Denotes the number of batches per epoch"""
        return len(self._image_locations)

    def __getitem__(self, index) -> Tuple[Tensor, str]:
        """Generate one batch of data"""

        url = self._image_locations[index]
        if self._cache and self._cache.exists(url):
            image_tensor = self._cache.get(url)
        else:
            image_file = self._image_handler.get(url)
            image_tensor = self._image_handler.normalize(image_file)

        return image_tensor, url
