import Button from '@/components/ui/Buttons/Button/Button'
import { selectCartTotalPrice } from '@/store/slices/cartSlice'
import logo from '@assets/logo.svg'
import { AppRoutes } from '@constants/appRoutes'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import CartIcon from '@svg/cart.svg?react'
import phone from '@svg/phone.svg'
import Modal from '@ui/Modal/Modal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()

  const totalPrice = useSelector(selectCartTotalPrice)

  const totalPrcieCart = totalPrice > 0 ? String(totalPrice) : ''

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev)
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
            <Stack justifyContent="center" alignItems="center">
              <img src={phone} alt="Phone" width={24} height={24} />
            </Stack>
            <Stack>
              <Typography variant="body1" color={theme.palette.text.primary}>
                +38 (050) 123 45 67
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {t('workingHours')}
              </Typography>
            </Stack>
          </Stack>

          <Stack flexDirection="row" justifyContent="center" alignItems="center" gap={4}>
            <Stack position="relative">
              <Button
                type="outlined"
                text={i18n.language.toUpperCase()}
                onClick={handleModalOpen}
              />
              {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
            </Stack>
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
