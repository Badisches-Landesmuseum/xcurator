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

export const imageLoader: ImageLoader = ({ src, width }) => {
  return formatImage(src, Math.floor(width));
};

export default formatImage;
