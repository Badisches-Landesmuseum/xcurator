# Color extraction

**Authors**: Nadav Babai | Sören Räuchle @ [3pc GmbH](https://www.3pc.de)

This service extracting the color palette of an input image. The algorithm is handling foreground/background as well
as 'shiny' colors (colors inside the image with a high saturation value).
Additionally, the color name is classified by a given [color Excel sheet](src/resources/Farben.xlsx)
during the extraction phrase by nearest-neighbor.

### Install, Run, Test

- Install dependencies: ```poetry install```
- Install Testing dependencies: ```poetry install --with test,dev```
- Run Tests: ```poetry run pytest```

### Tech-Stack

- [Python 3.11](https://www.python.org/)
- [Poetry](https://python-poetry.org/)
- [Pytorch](https://pytorch.org/)
- [Cuda](https://developer.nvidia.com/cuda-toolkit)
- More dependencies ```pyproject.yml```
- Runtime dependencies ```docker-compose.yml```

### Local Dev Environment Requirements
- Poetry installed -> [How To](https://python-poetry.org/docs/)
- Poetry Dynamic Versioning plugin installed -> [How to](https://github.com/mtkennerly/poetry-dynamic-versioning)
- GPU preferable for inference speed [RTX 4070 | RTX 2070 | 2080 (ti) tested]
- Cuda 11.8 installed (if GPU available) ->  [How to | Linux](https://gist.github.com/Mahedi-61/2a2f1579d4271717d421065168ce6a73)

### More Info | Documentation | Papers
- [Image Segmentation U2-Net](https://github.com/xuebinqin/U-2-Net)
- [Color Palette extraction](https://github.com/fengsp/color-thief-py/blob/master/colorthief.py)
* [color palette](src/resources/Farben.xlsx)

## Example Output:

### Image
<img src="doc/image.png" alt="image" width="400"/>

### Mask
<img src="doc/segmentation-mask.png" alt="image" width="400"/>

### Foreground
<img src="doc/foreground.png" alt="image" width="400"/>

### Colors Palette
- ![#69adff](https://via.placeholder.com/15/2e2b2a/000000?text=+) `#2e2b2a` ratio: 31.23 name: darkslategray
- ![#69adff](https://via.placeholder.com/15/967c69/000000?text=+) `#967c69` ratio: 10.99 name: gray
- ![#69adff](https://via.placeholder.com/15/6c5846/000000?text=+) `#6c5846` ratio: 8.58 name: darkolivegreen
- ![#69adff](https://via.placeholder.com/15/cab6a2/000000?text=+) `#cab6a2` ratio: 6.46 name: tan
- ![#69adff](https://via.placeholder.com/15/6a787d/000000?text=+) `#6a787d` ratio: 4.5 name: slategray
- ![#69adff](https://via.placeholder.com/15/585650/000000?text=+) `#585650` ratio: 4.35 name: dimgray
- ![#69adff](https://via.placeholder.com/15/4b6478/000000?text=+) `#4b6478` ratio: 2.73 name: dimgray
- ![#69adff](https://via.placeholder.com/15/a8aeae/000000?text=+) `#a8aeae` ratio: 0.31 name: darkgray
- ![#69adff](https://via.placeholder.com/15/9da1a5/000000?text=+) `#9da1a5` ratio: 0.26 name: darkgray
### Shiny Color
- ![#69adff](https://via.placeholder.com/15/4b6478/000000?text=+) `#4b6478` ratio: 2.73 name: dimgray
- ![#69adff](https://via.placeholder.com/15/6c5846/000000?text=+) `#6c5846` ratio: 8.58 name: darkolivegreen
- ![#69adff](https://via.placeholder.com/15/967c69/000000?text=+) `#967c69` ratio: 10.99 name: gray

### Background
<img src="doc/background.png" alt="image" width="400"/>

### Colors Palette
- ![#69adff](https://via.placeholder.com/15/a9a9a9/000000?text=+) `#a9a9a9` ratio: 24.53 name: darkgray
- ![#69adff](https://via.placeholder.com/15/362d29/000000?text=+) `#362d29` ratio: 3.88 name: darkslategray
- ![#69adff](https://via.placeholder.com/15/6f6d6a/000000?text=+) `#6f6d6a` ratio: 1.59 name: dimgray
- ![#69adff](https://via.placeholder.com/15/c2c4bf/000000?text=+) `#c2c4bf` ratio: 0.3 name: silver
- ![#69adff](https://via.placeholder.com/15/5c5350/000000?text=+) `#5c5350` ratio: 0.18 name: dimgray
- ![#69adff](https://via.placeholder.com/15/857a77/000000?text=+) `#857a77` ratio: 0.08 name: gray
- ![#69adff](https://via.placeholder.com/15/978970/000000?text=+) `#978970` ratio: 0.03 name: gray
- ![#69adff](https://via.placeholder.com/15/d7c6b2/000000?text=+) `#d7c6b2` ratio: 0.03 name: silver
- ![#69adff](https://via.placeholder.com/15/695e4b/000000?text=+) `#695e4b` ratio: 0.01 name: dimgray
### Shiny Color
- ![#69adff](https://via.placeholder.com/15/695e4b/000000?text=+) `#695e4b` ratio: 0.01 name: dimgray
- ![#69adff](https://via.placeholder.com/15/978970/000000?text=+) `#978970` ratio: 0.03 name: gray
- ![#69adff](https://via.placeholder.com/15/362d29/000000?text=+) `#362d29` ratio: 3.88 name: darkslategray

`#FF0000`