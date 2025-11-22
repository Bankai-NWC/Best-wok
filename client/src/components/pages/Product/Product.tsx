import PageTransition from '@/components/layout/PageTransition/PageTransition'
import ProductCard from '@/components/ui/Cards/ProductCard/ProductCard'
import { addCartItem, selectItemQuantity } from '@/store/slices/cartSlice'
import { Product as ProductProps } from '@/types'
import { svgs } from '@constants/svgs'
import { Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useGetCatalogQuery, useGetProductByIdQuery } from '@store/services/api'
import { RootState } from '@store/store'
import Button from '@ui/Buttons/Button/Button'
import QuantitySelector from '@ui/Buttons/QuantitySelector/QuantitySelector'
import ProductCardChip from '@ui/Chips/ProductCardChip/ProductCardChip'
import { OptimizedCloudImage } from '@ui/OptimizedCloudImage/OptimizedCloudImage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import style from './Product.module.scss'

function Product() {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const matches = useMediaQuery('(min-width:940px)')
  const recSize = isMd ? (isLg ? 4 : 3) : 1

  const { productId } = useParams<{ productId: string }>()

  const dispatch = useDispatch()
  const quantity = useSelector((state: RootState) => selectItemQuantity(state, productId!))

  const { t, i18n } = useTranslation()

  const { data: product, error, isLoading: isProductLoading } = useGetProductByIdQuery(productId!)
  const { data: products, isLoading: isCatalogLoading } = useGetCatalogQuery()
  const isReady = !isProductLoading && !isCatalogLoading

  const [recommendedProducts, setRecommendedProducts] = useState<ProductProps[]>([])

  const { Cart } = svgs

  const nutritionalValues = [
    {
      value: product?.nutritionalValue.calories,
      title: 'menu.product_info.nutritional_value_per_100g.kcal',
    },
    {
      value: product?.nutritionalValue.proteins,
      title: 'menu.product_info.nutritional_value_per_100g.proteins',
    },
    {
      value: product?.nutritionalValue.fats,
      title: 'menu.product_info.nutritional_value_per_100g.fats',
    },
    {
      value: product?.nutritionalValue.carbohydrates,
      title: 'menu.product_info.nutritional_value_per_100g.carbohydrates',
    },
    {
      value: product?.nutritionalValue.cellulose,
      title: 'menu.product_info.nutritional_value_per_100g.cellulose',
    },
  ]

  useEffect(() => {
    const filteredProducts = products?.filter((p) => p._id !== product?._id)

    if (filteredProducts) {
      const shuffled = filteredProducts.sort(() => 0.5 - Math.random())
      setRecommendedProducts(shuffled)
    } else {
      setRecommendedProducts([])
    }
  }, [products, product])

  if (error) return <p>Error loading product</p>

  return (
    <>
      <Divider />
      <PageTransition isReady={isReady}>
        {isReady && (
          <>
            <Stack
              component={'section'}
              position="relative"
              direction={{ xs: 'column', lg: 'row' }}
              gap={4}
              sx={{ mt: 6 }}
            >
              <ProductCardChip id={product?._id!} tags={product?.tags.en!} />
              <OptimizedCloudImage
                url={product?.imageUrl}
                alt={product?.name[i18n.language as 'ua' | 'en'] ?? product?.name.ua}
                width={660}
                height={584}
                className={style.img}
              />
              <Stack direction="column" gap={2} mt={8}>
                <Typography variant="h1" fontSize={36} fontWeight={500}>
                  {product?.name[i18n.language as 'ua' | 'en'] ?? product?.name.ua}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product?.portion} {t('units.grams')} | 1 {t('menu.product_info.serving')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('menu.product_info.ingredients')}:&nbsp;
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
                            <Typography
                              variant="body2"
                              fontSize={14}
                              fontWeight={600}
                              component={'span'}
                            >
                              &#8372;
                            </Typography>
                          </Typography>
                        </Stack>
                        <Typography variant="body1" fontSize={28} fontWeight={600}>
                          {product?.priceWithSale}&nbsp;
                          <Typography
                            variant="body2"
                            fontSize={24}
                            fontWeight={600}
                            component={'span'}
                          >
                            &#8372;
                          </Typography>
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography variant="body1" fontSize={28} fontWeight={600}>
                        {product?.price}&nbsp;
                        <Typography
                          variant="body2"
                          fontSize={24}
                          fontWeight={600}
                          component={'span'}
                        >
                          &#8372;
                        </Typography>
                      </Typography>
                    )}
                    {quantity === 0 ? (
                      <Button
                        type="contained"
                        icon={Cart}
                        text={t('action_buttons.add_to_cart')}
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
                      {t('menu.product_info.nutritional_value_per_100g.title')}
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
                      {nutritionalValues.map((item, index) => (
                        <Grid key={`${item.title}-${item.value}`} size="auto" textAlign="center">
                          <Typography variant="body1" fontWeight={500}>
                            {index === 0 ? item.value : item.value?.toFixed(2)}
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
            {matches && (
              <Stack mt={6}>
                <Typography variant="body1" fontSize={24}>
                  {t('pages.product.perfect_addition')}:
                </Typography>
                {products && (
                  <Stack direction="row" justifyContent="center" gap={6} mt={6} flexWrap="wrap">
                    {recommendedProducts.slice(0, recSize).map((p) => (
                      <ProductCard
                        key={p._id}
                        id={p._id}
                        name={p.name}
                        imageUrl={p.imageUrl}
                        sale={p.sale}
                        price={p.price}
                        priceWithSale={p.priceWithSale}
                        portion={p.portion}
                        ingredients={p.ingredients}
                        tags={p.tags.en}
                        category={p.category.en}
                      />
                    ))}
                  </Stack>
                )}
              </Stack>
            )}
            {!matches && (
              <Stack mt={10}>
                <Typography
                  variant="body1"
                  fontSize={24}
                  textAlign="center"
                  textTransform="uppercase"
                  color="text.secondary"
                >
                  {t('action_buttons.catalog_call_to_action')}{' '}
                  <Typography
                    component={Link}
                    to={'/'}
                    variant="body1"
                    fontSize={24}
                    textTransform="uppercase"
                    color="text.primary"
                    className={style.toCatalog}
                  >
                    {t('action_buttons.catalog_link')}
                  </Typography>
                  !
                </Typography>
              </Stack>
            )}
          </>
        )}
      </PageTransition>
    </>
  )
}

export default Product
