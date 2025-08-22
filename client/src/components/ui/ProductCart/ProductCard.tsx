import { buildRoute } from '@/constants/appRoutes'
import { Stack, Typography } from '@mui/material'
import CartIcon from '@svg/cart.svg?react'
import Button from '@ui/Buttons/Button/Button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import style from './ProductCard.module.scss'

type Props = {
  id: string
  name: { en: string; ua: string }
  imageUrl: string
  sale: number
  price: number
  priceWithSale: number
  portion: number
  //   tags: { en: string[]; ua: string[] }
  category: string
}

function ProductCard({
  id,
  name,
  imageUrl,
  sale,
  price,
  priceWithSale,
  portion,
  //   tags,
  category,
}: Props) {
  const { t, i18n } = useTranslation()

  return (
    <Stack className={style.card} sx={{ width: 282 }}>
      <Link to={buildRoute.product(category, id)}>
        <img src={imageUrl} alt={name[i18n.language as 'en' | 'ua'] ?? name.ua} width={266} />
      </Link>
      <Stack marginInline={3}>
        <Stack direction="row" alignItems="end" gap={2}>
          <div className={style.sale}>
            <Typography fontSize={12}>-{sale}%</Typography>
          </div>
          <Typography fontSize={12} className={style.crossed_out}>
            {price}&nbsp;₴
          </Typography>
        </Stack>
        <Typography variant="body1" fontSize={24} fontWeight={600} style={{ display: 'inline' }}>
          {sale > 0 ? priceWithSale : price}
          <span className={style.symbol}>&nbsp;₴</span>
        </Typography>

        <Typography
          className={style.link}
          variant="body1"
          component={Link}
          to={buildRoute.product(category, id)}
          fontSize={20}
        >
          {name[i18n.language as 'en' | 'ua'] ?? name.ua}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          mr={3}
          mt={2}
          color="text.secondary"
        >
          <Typography fontSize={12} color="">
            {portion} {t('units.grams')} | 1 {t('serving')}
          </Typography>
          <Button type="contained" icon={CartIcon} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProductCard
