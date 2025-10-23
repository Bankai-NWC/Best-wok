import { svgs } from '@constants/svgs'
import { Stack } from '@mui/material'
import style from './ProductSliderButton.module.scss'

interface Props {
  handlePrev: () => void
  handleNext: () => void
}

function ProductSliderButton({ handlePrev, handleNext }: Props) {
  const { Arrow } = svgs

  return (
    <Stack direction="row" alignItems="center">
      <button onClick={handlePrev} className={style.prevBtn}>
        <Arrow />
      </button>
      <button onClick={handleNext} className={style.nextBtn}>
        <Arrow className={style.flip_horizontal} />
      </button>
    </Stack>
  )
}

export default ProductSliderButton
