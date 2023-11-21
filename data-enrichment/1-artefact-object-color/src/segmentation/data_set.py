import logging
from typing import List, Union

import numpy as np
from PIL.Image import Image
from torch.utils.data import Dataset
from torchvision.transforms import transforms

from image_handler import ImageHandler
from segmentation.data_loader import RescaleT


class ImageDataSet(Dataset):
    def __len__(self):
        return len(self.images)

    def __init__(self, images: List[Union[Image, str]], urls: List[str] = None, lbl_name_list=None, transform=None,
                 image_handler: ImageHandler = ImageHandler()):
        if lbl_name_list is None:
            lbl_name_list = []
        self.images = images
        self.label_name_list = lbl_name_list
        self.transform = transform
        self._image_handler = image_handler
        self._urls = urls
        self.source_image_transform = transforms.Compose([RescaleT(320)])

    def __getitem__(self, idx: int):
        pil_image = self.images[idx]
        if self._urls:
            url = self._urls[idx]
        # noinspection PyTypeChecker

        if isinstance(pil_image, str):
            try:
                if pil_image.startswith("data"):

                    pil_image = self._image_handler.load_base64(pil_image, url)
                else:
                    pil_image = self._image_handler.load(pil_image)
                    url = pil_image.filename
            except Exception as e:
                logging.error(f"Unable to load image {pil_image}. Error: {str(e)}")
                del self.images[idx]
                return self.__getitem__(idx)
        else:
            url = None

        scaled = pil_image.resize((320,320))
        scales_image = np.asarray(scaled)
        # scales_image = scales_image.reshape(3, 320, 320)

        image = np.array(pil_image)
        size = pil_image.size
        index = np.array([idx])

        label_3 = np.zeros(image.shape)

        label = np.zeros(label_3.shape[0:2])
        if (3 == len(label_3.shape)):
            label = label_3[:, :, 0]
        elif (2 == len(label_3.shape)):
            label = label_3

        if (3 == len(image.shape) and 2 == len(label.shape)):
            label = label[:, :, np.newaxis]
        elif (2 == len(image.shape) and 2 == len(label.shape)):
            image = image[:, :, np.newaxis]
            label = label[:, :, np.newaxis]

        sample = {'index': index, 'image': image, 'label': label, 'orig': scales_image}

        if self.transform:
            sample = self.transform(sample)

        sample['size'] = size
        if url:
            sample['url'] = url

        return sample
