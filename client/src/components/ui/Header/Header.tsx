import Button from '@/components/ui/Buttons/Button/Button'
import PhonesButton from '@/components/ui/Buttons/PnonesButton/PhonesButton'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { phoneNumbers } from '@/constants/phoneNumbers'
import { svgs } from '@/constants/svgs'
import { selectCartTotalPrice } from '@/store/slices/cartSlice'
import logo from '@assets/logo.svg'
import { AppRoutes } from '@constants/appRoutes'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import CartIcon from '@svg/cart.svg?react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import style from './Header.module.scss'

function Header() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()

  const { Vodafone, Lifecell, Kyivstar } = svgs

  const phones = [
    {
      icon: <Vodafone width={24} height={24} />,
      number: phoneNumbers[0],
    },
    {
      icon: <Lifecell width={24} height={24} />,
      number: phoneNumbers[1],
    },
    {
      icon: <Kyivstar width={24} height={24} />,
      number: phoneNumbers[2],
    },
  ]

  const totalPrice = useSelector(selectCartTotalPrice)

  const totalPrcieCart = totalPrice > 0 ? String(totalPrice) : ''

  function handleChangeLanguage() {
    const newLanguage = i18n.language === 'en' ? 'ua' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default }}>
      <Box marginBlock={6} display="flex" alignItems="center" justifyContent="space-between">
        <Link to={AppRoutes.HOME}>
          <img src={logo} alt="BEST WOK" />
        </Link>

        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 4, md: 12 }}
        >
          <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
            display={{ xs: 'none', sm: 'flex' }}
          >
            <Dropdown button={<PhonesButton />}>
              <Stack
                flexDirection={'column'}
                alignItems="center"
                justifyContent="center"
                p={2}
                gap={2}
                width={200}
              >
                {phones.map((item) => (
                  <Stack key={item.number} flexDirection={'row'} gap={2}>
                    {item.icon}
                    <Typography
                      variant="body1"
                      component={'a'}
                      href={`tel: ${item.number}`}
                      className={style['phone-link']}
                    >
                      +38 {item.number}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Dropdown>
          </Stack>

          <Stack flexDirection="row" justifyContent="center" alignItems="center" gap={4}>
            <Dropdown button={<Button type="outlined" text={i18n.language.toUpperCase()} />}>
              <button className={style.button} onClick={handleChangeLanguage}>
                {i18n.language === 'en' ? 'UA' : 'EN'}
              </button>
            </Dropdown>
            <Button
              type={totalPrcieCart ? 'contained' : 'outlined'}
              icon={CartIcon}
              text={totalPrcieCart}
              symbol={totalPrcieCart ? ' ₴' : ''}
              onClick={() => navigate(AppRoutes.CART)}
            />
          </Stack>
        </Stack>
      </Box>
    </AppBar>
  )
}

export default Header
