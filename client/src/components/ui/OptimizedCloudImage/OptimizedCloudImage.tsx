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
  ...props
}) => {
  if (!url) return null

  const buildUrl = (baseUrl: string) => {
    const [prefix, rest] = baseUrl.split('/upload/')
    const transformation = `w_${width},h_${height},c_fill,f_auto,q_auto`
    return `${prefix}/upload/${transformation}/${rest}`
  }

  const optimizedUrl = buildUrl(url)

  return (
    <img src={optimizedUrl} alt={alt} width={width} height={height} loading="lazy" {...props} />
  )
}
