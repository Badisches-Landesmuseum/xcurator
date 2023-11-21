import open_clip
import torch
from overrides import overrides

from PickleRepository import PickleRepository
from embeddings.image_encoder import ImageEncoder
from embeddings.multimodal_encoder import MultiModalEncoder
from images.default_image_handler import DefaultImageHandler
from images.image_handler import ImageHandler


class OpenCLIP(ImageEncoder, MultiModalEncoder):
    """
    Multi modal Model to encode text and images

    Source: https://pypi.org/project/open-clip-torch/
    """

    def __init__(self, image_handler: ImageHandler = DefaultImageHandler(image_size=240), cache: PickleRepository = None, model_dir:str = None):
        super().__init__(image_handler, cache)
        device = "cuda" if torch.cuda.is_available() else "cpu"


        model, _, preprocess = open_clip.create_model_and_transforms('ViT-B-16-plus-240', pretrained='laion400m_e32',
                                                                     device=torch.device(device), jit=True)
        image_handler.set_preprocess(preprocess)
        self._model = model
        self._model.eval()
        self._embedder = model.encode_image

    @overrides
    def image_encoder(self):
        """Get image encoder of the multi-modal model."""
        return self._model.encode_image

    @overrides
    def text_encoder(self):
        """Get text encoder of the multi modal model."""
        return self._model.encode_text

    @overrides
    def dimension(self) -> int:
        """Output dimension of the encoder."""
        input_image_dim = (3, 240, 240)
        return self._embedder(torch.rand(*input_image_dim).unsqueeze(0).to(self.device)).shape[1]