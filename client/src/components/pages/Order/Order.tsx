import Button from '@/components/ui/Buttons/Button/Button'
import OrderSaleChip from '@/components/ui/Chips/OrderSaleChip/OrderSaleChip'
import AddressFormField from '@/components/ui/Forms/Fields/AddressFormField/AddressFormField'
import MaskedPhoneInput from '@/components/ui/Forms/Fields/MaskedPhoneInput/MaskedPhoneInput'
import TextFormField from '@/components/ui/Forms/Fields/TextFormField/TextFormField'
import OrderSummary from '@/components/ui/Forms/OrderSummary/OrderSummary'
import { clearCart, selectCartTotalPrice } from '@/store/slices/cartSlice'
import { OrderFormValues, ZoneType } from '@/types'
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Order() {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const totalCartPrice = useSelector(selectCartTotalPrice)

  const [zone, setZone] = useState<ZoneType>('none')
  const [finalPrice, setFinalPrice] = useState<number>(totalCartPrice)
  const [sale, setSale] = useState<number>(0)
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<OrderFormValues>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      address: '',
      deliveryMethod: 'Courier',
      paymentMethod: 'Online by card',
      comment: '',
      totalPrice: finalPrice,
    },
  })

  const deliveryMethod = useWatch({
    control,
    name: 'deliveryMethod',
  })

  useEffect(() => {
    if (totalCartPrice <= 0) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    setValue('paymentMethod', 'Online by card')
    if (deliveryMethod === 'Pickup') {
      setValue('address', 'Not required for pickup')
      setFinalPrice(totalCartPrice - Math.round((totalCartPrice / 100) * 10))
      setSale(Math.round((totalCartPrice / 100) * 10))
      setDeliveryPrice(0)
      setValue('totalPrice', totalCartPrice - Math.round((totalCartPrice / 100) * 10))
    } else {
      setFinalPrice(totalCartPrice)
      setValue('address', '')
      setSale(0)
      setZone('none')
      setValue('totalPrice', totalCartPrice)
    }
  }, [deliveryMethod, setValue])

  useEffect(() => {
    if (zone === 'green') {
      if (totalCartPrice >= 299) {
        setDeliveryPrice(0)
      } else {
        setDeliveryPrice(99)
      }
    } else if (zone === 'blue') {
      if (totalCartPrice >= 499) {
        setDeliveryPrice(0)
      } else {
        setDeliveryPrice(119)
      }
    } else if (zone === 'orange') {
      if (totalCartPrice >= 599) {
        setDeliveryPrice(0)
      } else {
        setDeliveryPrice(149)
      }
    } else if (zone === 'red') {
      if (totalCartPrice >= 699) {
        setDeliveryPrice(0)
      } else {
        setDeliveryPrice(199)
      }
    } else {
      setDeliveryPrice(0)
    }
  }, [zone, setZone])

  const onSubmit = (data: OrderFormValues) => {
    console.log('Order data:', data)
    dispatch(clearCart())
    reset()
    navigate('/')
  }

  return (
    <Box component={'section'}>
      <Typography variant="h4" component="h1" fontWeight={600} textTransform={'uppercase'}>
        {t('pages.order.title')}
      </Typography>
      <Divider sx={{ marginBlock: 6 }} />
      <Stack flexDirection="row" alignItems="center" justifyContent="center">
        <Stack
          flexDirection="column"
          gap={6}
          width={{ xs: '100%', md: '40%' }}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextFormField
                {...field}
                name="name"
                variant="filled"
                label={t('pages.order.name_field')}
                fullWidth
                autoComplete="given-name"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: 'Phone number is required',
              validate: (value) => value.replace(/\D/g, '').length === 12 || 'Invalid phone number',
            }}
            render={({ field }) => (
              <TextFormField
                {...field}
                name="phoneNumber"
                variant="filled"
                label={t('pages.order.phone_field')}
                fullWidth
                placeholder="+380 (67) 123-45-67"
                autoComplete="tel"
                slotProps={{
                  input: {
                    inputComponent: MaskedPhoneInput as any,
                  },
                }}
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{
              required: 'Address is required',
            }}
            render={({ field }) => (
              <AddressFormField<OrderFormValues>
                {...field}
                name="address"
                variant="filled"
                label={t('pages.order.address_field.label')}
                placeholder={t('pages.order.address_field.placeholder')}
                fieldName="address"
                disabled={deliveryMethod === 'Pickup'}
                errorMessage={errors.address?.message}
                setError={setError}
                clearErrors={clearErrors}
                setZone={setZone}
              />
            )}
          />
          <FormControl
            sx={{
              '& .MuiFormLabel-root': {
                '&.Mui-focused': {
                  color: 'text.secondary',
                },
              },
            }}
          >
            <FormLabel id="delivery-method">{t('pages.order.delivery.method')}</FormLabel>
            <Controller
              name="deliveryMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="Courier"
                    control={<Radio />}
                    label={t('pages.order.delivery.delivery_option_1')}
                  />
                  <FormControlLabel
                    value="Pickup"
                    control={<Radio />}
                    label={
                      <OrderSaleChip sale={10} text={t('pages.order.delivery.delivery_option_2')} />
                    }
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <FormControl
            sx={{
              '& .MuiFormLabel-root': {
                '&.Mui-focused': {
                  color: 'text.secondary',
                },
              },
            }}
          >
            <FormLabel id="payment-method">{t('pages.order.payment.method')}</FormLabel>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="Online by card"
                    control={<Radio />}
                    label={t('pages.order.payment.payment_option_1')}
                  />
                  <FormControlLabel
                    value={
                      deliveryMethod === 'Pickup'
                        ? t('pages.order.payment.payment_option_3')
                        : t('pages.order.payment.payment_option_2')
                    }
                    control={<Radio />}
                    label={
                      deliveryMethod === 'Pickup'
                        ? t('pages.order.payment.payment_option_3')
                        : t('pages.order.payment.payment_option_2')
                    }
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextFormField
                {...field}
                name="comment"
                id="comment"
                variant="filled"
                label={t('pages.order.comments_field.label')}
                placeholder={t('pages.order.comments_field.placeholder')}
                fullWidth
                autoComplete="off"
                errorMessage={errors.name?.message}
                multiline
                maxRows={3}
                slotProps={{
                  htmlInput: { maxLength: 145 },
                }}
              />
            )}
          />

          <OrderSummary
            totalCartPrice={totalCartPrice}
            sale={sale}
            deliveryPrice={deliveryPrice}
            deliveryMethod={getValues('deliveryMethod')}
            address={getValues('address')}
          />

          <Stack flexDirection="row" alignItems="center" justifyContent="flex-end">
            <Button
              isDisable={
                getValues('name') && getValues('phoneNumber') && getValues('address') ? false : true
              }
              typeRole="submit"
              type="contained"
              text={t('action_buttons.confirm_order')}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Order
