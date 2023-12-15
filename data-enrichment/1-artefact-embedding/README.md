# Image Clip Service

**Authors**: Sören Räuchle @ [3pc GmbH](https://www.3pc.de)

This service is responsible for image enrichment using the open-clip model.
Images in the form of base64 encoded strings will transformed into clip embeddings including also generated coca descriptions english.

### Install, Run, Test

- Install dependencies: ```poetry install```
- Install Testing dependencies: ```poetry install --with dev,test```
- Run Tests: ```poetry run tests```

### GPU Config:
- Cuda: 11.8
- Driver: Nvidia 515.86.01+
- Cards: RTX 4070 | RTX 2070 (Ti) | RTX 2080 (Ti) 

### Tech-Stack
- [Python 3.10](https://www.python.org/)
- [Poetry](https://python-poetry.org/)
- [openclip](https://github.com/mlfoundations/open_clip)
- More dependencies ```pyproject.toml```

### More Info | Documentation | Papers
- [Multilingual Clip](https://github.com/FreddeFrallan/Multilingual-CLIP)