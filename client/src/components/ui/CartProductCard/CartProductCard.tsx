import { CartProductCardProps } from '@/types'
import { Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import QuantitySelector from '@ui/Buttons/QuantitySelector/QuantitySelector'
import { buildRoute } from '@utils/buildRoute'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import style from './CartProductCard.module.scss'

function CartProductCard({
  id,
  name,
  imageUrl,
  sale,
  price,
  priceWithSale,
  ingredients,
  category,
}: CartProductCardProps) {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      marginInline={{ xs: 6, sm: 0 }}
      sx={{ width: { xs: 282, sm: '100%' }, pb: { xs: 4, sm: 0 } }}
      className={style.card}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={4}>
        <Link to={buildRoute.product(category, id)}>
          <img src={imageUrl} width={204} className={style.product_image} />
        </Link>
        <Stack direction="column" gap={2}>
          {isMobile && (
            <Stack direction="column" alignItems="flex-start">
              {sale > 0 && (
                <>
                  <Stack direction="row" alignItems="center" gap={2}>
                    <div className={style.sale}>
                      <Typography fontSize={12}>-{sale}%</Typography>
                    </div>
                    <Typography fontSize={12} className={style.crossed_out}>
                      {price}&nbsp;
                      <Typography variant="body2" fontSize={11} component={'span'}>
                        &#8372;
                      </Typography>
                    </Typography>
                  </Stack>
                </>
              )}
              <Typography
                variant="body1"
                fontSize={24}
                fontWeight={600}
                style={{ display: 'inline' }}
              >
                {sale > 0 ? priceWithSale : price}&nbsp;
                <Typography variant="body2" fontSize={18} component={'span'}>
                  &#8372;
                </Typography>
              </Typography>
            </Stack>
          )}
          <Typography
            variant="body1"
            component={Link}
            to={buildRoute.product(category, id)}
            className={style.link}
            fontSize={24}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name[i18n.language as 'en' | 'ua'] ?? name.ua}
          </Typography>
          <Typography
            display={{ xs: 'none', sm: 'block' }}
            variant="body2"
            color="text.secondary"
            maxWidth={612}
            sx={{
              pr: 3,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {t('ingredients')}:&nbsp;
            {ingredients[i18n.language as 'en' | 'ua']}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={{ xs: 'row', sm: 'column' }} alignItems="flex-end" gap={4}>
        {!isMobile && (
          <Stack direction="column" alignItems="flex-end">
            {sale > 0 && (
              <>
                <Stack direction="row" alignItems="center" gap={2}>
                  <div className={style.sale}>
                    <Typography fontSize={12}>-{sale}%</Typography>
                  </div>
                  <Typography fontSize={12} className={style.crossed_out}>
                    {price}&nbsp;
                    <Typography variant="body2" fontSize={11} component={'span'}>
                      &#8372;
                    </Typography>
                  </Typography>
                </Stack>
              </>
            )}
            <Typography
              variant="body1"
              fontSize={24}
              fontWeight={600}
              style={{ display: 'inline' }}
            >
              {sale > 0 ? priceWithSale : price}&nbsp;
              <Typography variant="body2" fontSize={18} component={'span'}>
                &#8372;
              </Typography>
            </Typography>
          </Stack>
        )}
        <Stack mt={{ xs: 2, sm: 0 }}>
          <QuantitySelector productId={id} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CartProductCard
