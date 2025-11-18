import CartProductCard from '@/components/ui/Cards/CartProductCard/CartProductCard'
import { AppRoutes } from '@/constants/appRoutes'
import { Divider, Stack, Typography } from '@mui/material'
import { selectCartItems, selectCartTotalPrice } from '@store/slices/cartSlice'
import Button from '@ui/Buttons/Button/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import style from './Cart.module.scss'

function Cart() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const productsInCart = useSelector(selectCartItems)
  const totalCartPrice = useSelector(selectCartTotalPrice)

  return (
    <>
      <Typography variant="h4" component="h1" fontWeight={600} textTransform={'uppercase'}>
        {t(`pages.cart_page.title`)}
      </Typography>
      <Divider sx={{ marginBlock: 6 }} />
      <Stack
        direction="column"
        alignItems="center"
        gap={4}
        sx={{ pr: { xs: 0, sm: 4 } }}
        className={style.wrapper}
      >
        {productsInCart.map((item) => (
          <CartProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            sale={item.sale}
            price={item.price}
            priceWithSale={item.priceWithSale}
            category={item.category}
            ingredients={item.ingredients}
          />
        ))}
      </Stack>
      <Divider sx={{ marginBlock: 6 }} />
      <Stack direction="row" justifyContent="flex-end" alignItems="baseline" gap={2}>
        <Typography variant="body1" fontSize={24} fontWeight={600}>
          {t(`pages.cart_page.order_amount`)}
        </Typography>
        <span className={style.divider}></span>
        <Typography variant="body1" fontSize={24} fontWeight={600}>
          {totalCartPrice}&nbsp;
          <Typography variant="body2" fontSize={20} fontWeight={600} component={'span'}>
            &#8372;
          </Typography>
        </Typography>
      </Stack>
      <Stack flexDirection="row" justifyContent="flex-end" mt={6}>
        <Button
          text={t('action_buttons.go_to_checkout')}
          isDisable={productsInCart.length > 0 || totalCartPrice > 0 ? false : true}
          onClick={() => navigate(AppRoutes.ORDER)}
        />
      </Stack>
    </>
  )
}

export default Cart
