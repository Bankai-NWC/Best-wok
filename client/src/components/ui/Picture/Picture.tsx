import React from 'react';

interface PictureProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: {
    sources: Record<string, string>;
    img: string;
  };
  alt: string;
}

export const Picture: React.FC<PictureProps> = ({
  src,
  alt,
  ...props
}) => {
  return (
    <picture>
      {src.sources.avif && (
        <source srcSet={src.sources.avif} type="image/avif" />
      )}
      {src.sources.webp && (
        <source srcSet={src.sources.webp} type="image/webp" />
      )}

      <img src={src.img} alt={alt} {...props} />
    </picture>
  );
};
