import { CategoryButtonProps } from '@/types'
import { Typography } from '@mui/material'
import style from './CategoryButton.module.scss'

function CategoryButton({ imageSrc, text, onClick }: CategoryButtonProps) {
  return (
    <button className={style.button} onClick={onClick}>
      <img src={imageSrc} alt={text} className={style.image} />
      <div className={style.overlay}></div>
      <Typography
        className={style.text}
        fontWeight={600}
        fontSize={36}
        ml={6}
        variant="body1"
        color="text.primary"
      >
        {text}
      </Typography>
    </button>
  )
}

export default CategoryButton
