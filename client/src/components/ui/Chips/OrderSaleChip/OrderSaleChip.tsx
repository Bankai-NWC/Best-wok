import { Stack, Typography } from '@mui/material'
import style from './OrderSaleChip.module.scss'

function OrderSaleChip({ sale, text }: { sale: number; text?: string }) {
  return (
    <Stack flexDirection="row" alignItems="center" gap={2}>
      <Typography variant="body1">{text}</Typography>
      <span className={style.sale}>-{sale}%</span>
    </Stack>
  )
}

export default OrderSaleChip
