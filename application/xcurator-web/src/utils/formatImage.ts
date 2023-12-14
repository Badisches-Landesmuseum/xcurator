import { ImageLoader } from 'next/image';

function formatIIIFImage(
  initialURL: string,
  format: string,
  width: number | string,
  height?: number | string
) {
  return initialURL.replace(
    /\/full\/!?(\d+),(\d+)?\/0\/(.*\.(\w+))$/,
    height
      ? `/full/!${width},${height}/0/${format}`
      : `/full/${width},/0/${format}`
  );
}

const formatImage = (
  imageUrl: string,
  width: number | string,
  height?: number | string
) => {
  if (imageUrl.includes('iiif')) {
    return formatIIIFImage(imageUrl, 'default.jpg', width, height);
  } else {
    return imageUrl.replace(/&?width=.*?(?=&|$)/, `&width=${width}`);
  }
};

export function saveSizeImage(image: { width: number }): ImageLoader {
  return ({ src, width }) => {
    const size = Math.min(image.width, width);
    return formatImage(src, size, size);
  };
}

export const fixFrameImageLoader: ImageLoader = ({ src, width: size }) => {
  return formatImage(src, size, size);
};
