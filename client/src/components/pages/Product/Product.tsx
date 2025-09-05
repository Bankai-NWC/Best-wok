import { addCartItem, selectItemQuantity } from '@/store/slices/cartSlice'
import { svgs } from '@constants/svgs'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { useGetProductByIdQuery } from '@store/services/api'
import { RootState } from '@store/store'
import Button from '@ui/Buttons/Button/Button'
import QuantitySelector from '@ui/Buttons/QuantitySelector/QuantitySelector'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import style from './Product.module.scss'

function Product() {
  const { productId } = useParams<{ productId: string }>()
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId!)
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const quantity = useSelector((state: RootState) => selectItemQuantity(state, productId!))

  const { Cart } = svgs

  const nutritionalValues = [
    {
      value: product?.nutritionalValue.calories,
      title: 'nutritionalValuePer100g.kcal',
    },
    {
      value: product?.nutritionalValue.proteins,
      title: 'nutritionalValuePer100g.proteins',
    },
    {
      value: product?.nutritionalValue.fats,
      title: 'nutritionalValuePer100g.fats',
    },
    {
      value: product?.nutritionalValue.carbohydrates,
      title: 'nutritionalValuePer100g.carbohydrates',
    },
    {
      value: product?.nutritionalValue.cellulose,
      title: 'nutritionalValuePer100g.cellulose',
    },
  ]

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading product</p>

  return (
    <>
      <Divider />
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} sx={{ mt: 6 }}>
        <img
          src={product?.imageUrl}
          alt={product?.name[i18n.language as 'ua' | 'en'] ?? product?.name.ua}
          width={660}
          height={584}
          className={style.img}
        />
        <Stack direction="column" gap={2} mt={8} minHeight={400}>
          <Typography variant="h1" fontSize={36} fontWeight={500}>
            {product?.name[i18n.language as 'ua' | 'en'] ?? product?.name.ua}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product?.portion} {t('units.grams')} | 1 {t('serving')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('ingredients')}:{' '}
            {product?.ingredients[i18n.language as 'ua' | 'en'] ?? product?.ingredients.ua}
          </Typography>
          <Stack direction="column" gap={3}>
            <Stack
              direction={{ xs: 'row', lg: 'column' }}
              alignItems={{ xs: 'center', lg: 'flex-start' }}
              justifyContent={{ xs: 'space-between', lg: 'flex-start' }}
              gap={3}
            >
              {product?.sale !== undefined && product?.sale > 0 ? (
                <Stack direction="column">
                  <Stack direction="row" alignItems="baseline" gap={2}>
                    <div className={style.sale}>
                      <Typography fontSize={16}>-{product?.sale}%</Typography>
                    </div>
                    <Typography
                      variant="body1"
                      fontSize={16}
                      fontWeight={600}
                      className={style.crossed_out}
                    >
                      {product?.price}&nbsp;
                      <Typography variant="body2" fontSize={14} fontWeight={600} component={'span'}>
                        &#8372;
                      </Typography>
                    </Typography>
                  </Stack>
                  <Typography variant="body1" fontSize={28} fontWeight={600}>
                    {product?.priceWithSale}&nbsp;
                    <Typography variant="body2" fontSize={24} fontWeight={600} component={'span'}>
                      &#8372;
                    </Typography>
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="body1" fontSize={28} fontWeight={600}>
                  {product?.price}&nbsp;
                  <Typography variant="body2" fontSize={24} fontWeight={600} component={'span'}>
                    &#8372;
                  </Typography>
                </Typography>
              )}
              {quantity === 0 ? (
                <Button
                  type="contained"
                  icon={Cart}
                  text={t('addToCart')}
                  maxWidth={212}
                  onClick={() => {
                    dispatch(
                      addCartItem({
                        id: product?._id!,
                        name: product?.name!,
                        imageUrl: product?.imageUrl!,
                        portion: product?.portion!,
                        sale: product?.sale!,
                        price: product?.price!,
                        priceWithSale: product?.priceWithSale!,
                        category: product?.category.en!,
                        ingredients: product?.ingredients!,
                        quantity: 1,
                      }),
                    )
                  }}
                />
              ) : (
                <QuantitySelector productId={product?._id!} />
              )}
            </Stack>
            <Divider />
            <Stack marginBlock={2}>
              <Typography variant="body1" color="text.secondary">
                {t('nutritionalValuePer100g.title')}
              </Typography>
              <Grid
                container
                spacing={4}
                direction="row"
                sx={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                {nutritionalValues.map((item) => (
                  <Grid key={`${item.title}-${item.value}`} size="auto" textAlign="center">
                    <Typography variant="body1" fontWeight={500}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(item.title)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Stack>
            <Divider />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Product
