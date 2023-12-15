import pickle
from pathlib import Path
from typing import Union
from urllib.parse import urlparse, unquote

import numpy as np


class PickleRepository:

    def __init__(self, sub_folder: str = None):
        index = [idx for idx, path in enumerate(list(Path().absolute().parts)) if 'service' in path][0] + 1
        self._directory = Path(*Path().absolute().parts[0:index], "_pickle_data")
        if not self._directory.exists():
            self._directory.mkdir(exist_ok=True)
        if sub_folder:
            self._directory = Path(self._directory, sub_folder)
            self._directory.mkdir(exist_ok=True)

    def reset(self):
        for file in self._directory.glob('*.pkl'):
            file.unlink()

    def remove(self):
        self.reset()
        if self._directory.name != '_pickle_data' and self._directory.exists():
            self._directory.rmdir()

    def path(self, file_path: Union[str, Path]) -> Path:
        if (str(file_path).startswith("http")):
            file_path = unquote(urlparse(file_path).path.split("/")[-1])
        file = Path(self._directory, Path(file_path).name)
        if not str(file).endswith(".pkl"):
            file = file.with_suffix('.pkl')
        return file

    def get(self, file_path: Union[str, Path]) -> np.ndarray:
        file = self.path(file_path)
        with file.open("rb") as fp:
            loaded_data = pickle.load(fp)
        return loaded_data

    def safe(self, data: np.ndarray, file_path: Union[str, Path]) -> Path:
        file = self.path(file_path)
        with file.open("wb") as filehandler:
            # store the data list as binary data stream
            pickle.dump(data, filehandler)
        return file

    def exists(self, file_path: Union[str, Path]) -> bool:
            return self.path(file_path).exists()

    def count(self) -> int:
        return len(list(self._directory.glob('*.pkl')))
