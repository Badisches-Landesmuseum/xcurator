import torch
import torchvision.transforms as transforms
from PIL import Image
from overrides import overrides
from torch import Tensor

from images.image_handler import ImageHandler


class DefaultImageHandler(ImageHandler):
    """Default Image Handler for accessing and prepare images for inference (NO TRAINING)"""
    _preprocess = None
    _device = "cuda" if torch.cuda.is_available() else "cpu"

    def __init__(self, image_size=224):
        self._dimension = 3, image_size, image_size

    @overrides
    def normalize(self, image: Image) -> Tensor:
        """Preprocess normalization of an image (resize, coloring, ..) for inference)"""

        if  self._preprocess:
            return self._preprocess(image).to(self._device, non_blocking=True)

        normalize = transforms.Compose([
            transforms.Resize(size=(self.dimension()[1], self.dimension()[2])),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

        return normalize(image).to(self._device, non_blocking=True)

    @overrides
    def dimension(self):
        """Dimension of the normalized Image"""
        return self._dimension

    @overrides
    def set_preprocess(self, preprocess) -> None:
        """Set a custom image preprocess"""
        self._preprocess = preprocess
