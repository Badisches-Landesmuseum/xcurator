import logging
from pathlib import Path
from typing import List, Union, Dict

import torch
import torchvision.transforms as T
from PIL import ImageOps
from PIL.Image import Image
from torch.multiprocessing import set_start_method, get_start_method
from torch.utils.data import DataLoader
from torchvision.transforms import transforms

from src.segmentation.data_loader import RescaleT, ToTensorLab
from src.segmentation.data_set import ImageDataSet
from src.segmentation.u2net import U2NET


class ImageSegmentor:
    tensor_to_image = T.ToPILImage()

    def __init__(self, model_path: Path, batch_size: int = 8):
        # self.__device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.__device = 'cpu'
        self.__batch_size = batch_size

        # if torch.cuda.is_available() and get_start_method(allow_none=True) != 'spawn':
        #     set_start_method("spawn", force=True)

        logging.info(f"Image Segmentor is running on device: {self.__device}")

        self.__u2net = U2NET(3, 1)

        # if torch.cuda.is_available():
        #     self.__u2net.load_state_dict(torch.load(model_path))
        #     self.__u2net.cuda()
        # else:
        self.__u2net.load_state_dict(torch.load(model_path, map_location='cpu'))

        self.__u2net.eval()

    def get_model(self):
        return self.__u2net

    @staticmethod
    def normPRED(d):
        ma = torch.max(d)
        mi = torch.min(d)

        dn = (d - mi) / (ma - mi)

        return dn

    def __dataloader(self, images: List[Union[Image, str]] = None, image_urls: List[str] = None) -> DataLoader:
        if images is None:
            images = []

        data_set = ImageDataSet(images=images,
                                urls=image_urls,
                                transform=transforms.Compose([RescaleT(320),
                                                              ToTensorLab(flag=0)])
                                )

        num_gpus = torch.cuda.device_count()
        return DataLoader(data_set,
                          batch_size=self.__batch_size,
                          shuffle=False,
                          num_workers=4 * num_gpus)

    def extract_masks(self, images: List[Union[Image, str]], apply_segmentation: bool = True) -> Dict:
        dataloader = self.__dataloader(images)

        for index, data in enumerate(dataloader):
            tensor = data['image'].contiguous()
            if self.__device == 'cuda':
                tensor = tensor.cuda()
            tensor = tensor.float()  # convert to float32
            d1, d2, d3, d4, d5, d6, d7 = self.__u2net(tensor)

            # normalization
            prediction = d1[:, 0, :, :]
            prediction = ImageSegmentor.normPRED(prediction)

            del d1, d2, d3, d4, d5, d6, d7  # free memory

            for batch_index in range(prediction.shape[0]):
                mask = self.tensor_to_image(prediction[batch_index])
                image_index = data['index'][batch_index].item()
                image = images[image_index].resize(mask.size)

                url = data['url'][batch_index] if 'url' in data else 'unknown'

                output = {'image': image, 'mask': mask, 'source': url}

                if apply_segmentation:
                    output['foreground'] = self.segmentation(image, mask)
                    output['background'] = self.background(image, mask)
                yield output

    def extract_base64_masks(self, images: Dict[str, str], apply_segmentation: bool = True) -> Dict:
        dataloader = self.__dataloader(list(images.values()), list(images.keys()))

        with torch.no_grad():
            for index, data in enumerate(dataloader):

                tensor = data['image'].contiguous()
                if self.__device == 'cuda':
                    tensor = tensor.cuda()
                tensor = tensor.float()  # convert to float32
                d1, d2, d3, d4, d5, d6, d7 = self.__u2net(tensor)

                # normalization
                prediction = d1[:, 0, :, :]
                prediction = ImageSegmentor.normPRED(prediction)

                del d1, d2, d3, d4, d5, d6, d7  # free memory
                masks = [transforms.ToPILImage(mode="L")(x_) for x_ in prediction]
                images = [transforms.ToPILImage(mode="RGB")(x_.permute(2, 0, 1)) for x_ in data['orig']]
                foregrounds = [self.segmentation(image, mask) for image, mask in zip(images, masks)]
                backgrounds = [self.background(image, mask) for image, mask in zip(images, masks)]
                urls = data['url']

                for image, mask, foreground, background, url in zip(images, masks, foregrounds, backgrounds, urls):
                    yield {
                        'image': image,
                        'mask': mask,
                        'source': url,
                        'foreground': foreground,
                        'background': background
                    }

    @staticmethod
    def segmentation(image: Image, mask: Image) -> Image:
        foreground = image.copy()
        foreground.putalpha(mask)
        return foreground

    @staticmethod
    def background(image: Image, mask: Image):
        im_invert = ImageOps.invert(mask)
        return ImageSegmentor.segmentation(image, im_invert)

    @staticmethod
    def filename(image: Image):
        return str(Path(image.filename).name)
