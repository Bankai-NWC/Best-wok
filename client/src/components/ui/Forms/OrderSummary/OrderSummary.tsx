import { Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

type OrderSummaryProps = {
  totalCartPrice: number
  sale: number
  deliveryPrice: number
  address: string
  deliveryMethod: string
}

function OrderSummary({
  totalCartPrice,
  sale,
  deliveryPrice,
  address,
  deliveryMethod,
}: OrderSummaryProps) {
  const { t } = useTranslation()

  return (
    <Stack flexDirection="column" gap={0.5}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="body1" fontSize={16}>
          {t('pages.order.summary.product')}:
        </Typography>
        <Typography variant="body1" fontSize={16} textAlign="right">
          {totalCartPrice}
          <Typography variant="body2" fontSize={12} component={'span'}>
            {' '}
            ₴
          </Typography>
        </Typography>
      </Stack>

      <AnimatePresence mode="wait">
        {sale > 0 && (
          <motion.div
            key={'sale'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body1" fontSize={16}>
                {t('pages.order.summary.sale')}:
              </Typography>
              <Typography variant="body1" fontSize={16} textAlign="right">
                -{sale}
                <Typography variant="body2" fontSize={12} component={'span'}>
                  {' '}
                  ₴
                </Typography>
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {address.length > 0 && (
          <motion.div
            key={'delivery'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body1" fontSize={16}>
                {t('pages.order.summary.delivery.title')}:
              </Typography>
              <Typography variant="body1" fontSize={16} textAlign="right">
                {deliveryMethod === 'Courier' && deliveryPrice > 0
                  ? deliveryPrice
                  : t('pages.order.summary.delivery.free')}
                {deliveryPrice > 0 && (
                  <Typography variant="body2" fontSize={12} component={'span'}>
                    {' '}
                    ₴
                  </Typography>
                )}
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>

      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="body1" fontSize={16}>
          {t('pages.order.summary.total')}:
        </Typography>
        <Typography variant="body1" fontSize={16} textAlign="right">
          {totalCartPrice - sale + deliveryPrice}{' '}
          <Typography variant="body2" fontSize={12} component={'span'}>
            ₴
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default OrderSummary
