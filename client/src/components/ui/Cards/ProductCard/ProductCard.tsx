import { addCartItem, selectItemQuantity } from '@/store/slices/cartSlice'
import { ProductCardProps } from '@/types'
import { buildRoute } from '@/utils/buildRoute'
import { svgs } from '@constants/svgs'
import { Stack, Typography } from '@mui/material'
import { RootState } from '@store/store'
import Button from '@ui/Buttons/Button/Button'
import QuantitySelector from '@ui/Buttons/QuantitySelector/QuantitySelector'
import ProductCardChip from '@ui/Chips/ProductCardChip/ProductCardChip'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from './ProductCard.module.scss'

function ProductCard({
  id,
  name,
  imageUrl,
  sale,
  price,
  priceWithSale,
  portion,
  ingredients,
  tags,
  category,
}: ProductCardProps) {
  const dispatch = useDispatch()
  const quantity = useSelector((state: RootState) => selectItemQuantity(state, id))
  const { t, i18n } = useTranslation()

  const { Cart } = svgs

  return (
    <Stack
      className={style.card}
      position="relative"
      component={'article'}
      sx={{ width: 282, height: 438 }}
    >
      <ProductCardChip id={id} tags={tags} />
      <Link to={buildRoute.product(category, id)}>
        <img
          className={style.product_image}
          src={imageUrl}
          alt={name[i18n.language as 'en' | 'ua'] ?? name.ua}
          width={266}
          height={234}
        />
      </Link>
      <Stack marginInline={3}>
        {sale > 0 ? (
          <Stack direction="row" alignItems="end" gap={2}>
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
        ) : (
          <Stack height={22}></Stack>
        )}

        <Typography variant="body1" fontSize={24} fontWeight={600} style={{ display: 'inline' }}>
          {sale > 0 ? priceWithSale : price}&nbsp;
          <Typography variant="body2" fontSize={18} component={'span'}>
            &#8372;
          </Typography>
        </Typography>

        <Stack minHeight={60}>
          <Typography
            className={style.link}
            variant="body1"
            component={Link}
            to={buildRoute.product(category, id)}
            fontSize={20}
            title={name[i18n.language as 'en' | 'ua'] ?? name.ua}
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
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          mr={3}
          mt={2}
          color="text.secondary"
        >
          <Typography fontSize={12}>
            {portion} {t('units.grams')} | 1 {t('menu.product_info.serving')}
          </Typography>
          {quantity === 0 ? (
            <Button
              type="contained"
              icon={Cart}
              onClick={() => {
                dispatch(
                  addCartItem({
                    id: id,
                    name: name,
                    imageUrl: imageUrl,
                    portion: portion,
                    sale: sale,
                    price: price,
                    priceWithSale: priceWithSale,
                    category: category,
                    ingredients: ingredients,
                    quantity: 1,
                  }),
                )
              }}
            />
          ) : (
            <QuantitySelector productId={id} />
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProductCard
