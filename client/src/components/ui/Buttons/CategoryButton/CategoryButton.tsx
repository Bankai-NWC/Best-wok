import { CategoryButtonProps } from '@/types'
import { Typography } from '@mui/material'
import { Picture } from '../../Picture/Picture'
import style from './CategoryButton.module.scss'

function CategoryButton({ imageSrc, text, onClick }: CategoryButtonProps) {
  return (
    <button className={style.button} onClick={onClick}>
      <Picture src={imageSrc} alt={text} width={364} height={84} className={style.image} />
      <div className={style.overlay}></div>
      <Typography
        className={style.text}
        fontWeight={600}
        fontSize={36}
        ml={{
          xs: 1,
          sm: 1,
          md: 6,
        }}
        variant="body1"
        color="text.primary"
      >
        {text}
      </Typography>
    </button>
  )
}

export default CategoryButton
