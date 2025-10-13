import { selectItemQuantity, updateQuantity } from '@/store/slices/cartSlice'
import { RootState } from '@/store/store'
import { QuantitySelectorProps } from '@/types'
import { svgs } from '@constants/svgs'
import { Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import style from './QuantitySelector.module.scss'

function QuantitySelector({ productId }: QuantitySelectorProps) {
  const dispatch = useDispatch()
  const quantity = useSelector((state: RootState) => selectItemQuantity(state, productId))

  const { Minus, Plus } = svgs

  const increment = () => {
    dispatch(updateQuantity({ id: productId, quantity: quantity + 1 }))
  }

  const decrement = () => {
    dispatch(updateQuantity({ id: productId, quantity: quantity - 1 }))
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={style.container}
    >
      <button onClick={decrement} className={style.decrement}>
        <Minus />
      </button>
      <Typography
        variant="body1"
        color="primary"
        fontSize={28}
        maxWidth={32}
        className={style.quantity}
      >
        {quantity}
      </Typography>
      <button onClick={increment} className={style.increment}>
        <Plus />
      </button>
    </Stack>
  )
}

export default QuantitySelector
