import open_clip
import torch
from torch import Tensor

from embeddings.image_decoder import ImageDecoder
from images.default_image_handler import DefaultImageHandler
from images.image_handler import ImageHandler


def decode(data):
    return open_clip.decode(data[0]).split("<end_of_text>")[0].replace("<start_of_text>", "")


class CocaDecoder(ImageDecoder):

    def __init__(self, image_handler: ImageHandler = DefaultImageHandler()):
        super().__init__(image_handler)
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model, _, transform = open_clip.create_model_and_transforms(
            model_name="coca_ViT-L-14",
            pretrained="mscoco_finetuned_laion2B-s13B-b90k",
            device=torch.device(device)
        )

        self._model = model
        self._model.eval()

    def decode(self, data:Tensor) -> str:
        return open_clip.decode(data[0]).split("<end_of_text>")[0].replace("<start_of_text>", "")
