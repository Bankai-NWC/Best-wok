interface OptimizedCloudImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string | undefined
  alt: string | undefined
  width?: number
  height?: number
  responsive?: number[]
}

export const OptimizedCloudImage: React.FC<OptimizedCloudImageProps> = ({
  url,
  alt,
  width,
  height,
  responsive = [300, 600, 900],
  ...props
}) => {
  const buildUrl = (baseUrl: string, w?: number, h?: number) => {
    const [prefix, rest] = baseUrl.split('/upload/')
    let transformation = 'f_auto,q_auto'
    if (w) transformation = `w_${w},` + transformation
    if (h) transformation = `h_${h},c_fill,` + transformation
    return `${prefix}/upload/${transformation}/${rest}`
  }

  if (!url) return null

  return (
    <picture>
      {responsive.map((w) => (
        <source key={w} srcSet={buildUrl(url, w, height)} media={`(max-width: ${w}px)`} />
      ))}
      <img src={buildUrl(url, width, height)} alt={alt} loading="lazy" {...props} />
    </picture>
  )
}
