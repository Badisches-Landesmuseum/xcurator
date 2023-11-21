import numpy as np
from PIL import Image
from matplotlib import pyplot as plt


class TestUtil:

    @staticmethod
    def show_images(image_paths: list[str], cols=1, titles=None):
        """Display a list of images in a single figure with matplotlib.

        Parameters
        ---------
        image_paths: List of paths compatible with plt.imshow.

        cols (Default = 1): Number of columns in figure (number of rows is
                            set to np.ceil(n_images/float(cols))).

        titles: List of titles corresponding to each image. Must have
                the same length as titles.
        """

        assert ((titles is None) or (len(image_paths) == len(titles)))
        images = [Image.open(path) for path in image_paths]
        for image in images:
            image.thumbnail((500, 500), Image.ANTIALIAS)
        n_images = len(images)
        if titles is None: titles = ['Image (%d)' % i for i in range(1, n_images + 1)]
        fig = plt.figure()
        for n, (image, title) in enumerate(zip(images, titles)):
            a = fig.add_subplot(cols, int(np.ceil(n_images / float(cols))), n + 1)
            plt.imshow(image)
            a.set_title(title)
        fig.set_size_inches(np.array(fig.get_size_inches()) * n_images)
        plt.show()
