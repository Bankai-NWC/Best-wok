import { Picture } from '@/components/ui/Picture/Picture'
import qrcode from '@assets/images/qrcode.png?as=picture&format=avif;webp&imagetools'
import logo from '@assets/logo.svg'
import { AppRoutes } from '@constants/appRoutes'
import { svgs } from '@constants/svgs'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import RotatingPhone from '../RotatingPhone/RotatingPhone'
import style from './Footer.module.scss'

function Footer() {
  const { AppStore, GooglePlay } = svgs
  const { t } = useTranslation()

  const about = [
    { title: t('footer.section_about.about_us'), path: AppRoutes.ABOUT },
    { title: t('footer.section_about.contacts'), path: AppRoutes.CONTACTS },
    { title: t('footer.section_about.payment_and_delivery'), path: AppRoutes.PAYMENT_AND_DELIVERY },
    { title: t('footer.section_about.promotions'), path: AppRoutes.PROMO },
  ]

  const ourMenu = [
    { title: t('footer.section_menu.wok'), path: AppRoutes.CATALOG.WOK },
    { title: t('footer.section_menu.rolls'), path: AppRoutes.CATALOG.ROLLS },
    { title: t('footer.section_menu.poke_bowls'), path: AppRoutes.CATALOG.POKE_BOWLS },
    { title: t('footer.section_menu.street_food'), path: AppRoutes.CATALOG.STREET_FOOD },
    { title: t('footer.section_menu.soups'), path: AppRoutes.CATALOG.SOUPS },
  ]

  return (
    <Box component={'footer'}>
      <Divider sx={{ mt: 12, mb: 2, color: '#1c1c1e' }} />
      <Box
        component={'nav'}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: 9,
        }}
        className={style.footerNav}
      >
        <Stack
          sx={{
            flexDirection: { sm: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: 9,
          }}
        >
          <div>
            <Link to={AppRoutes.HOME}>
              <img src={logo} alt="BEST WOK" />
            </Link>
          </div>
          <Stack direction="row" gap={9}>
            <Stack>
              <Typography variant="body1" fontSize={20} fontWeight={700}>
                {t('footer.section_about.title')}
              </Typography>
              <ul className={style.menu}>
                {about.map((item) => (
                  <li key={item.title} className={style.menuItem}>
                    <Typography
                      variant="body1"
                      component={Link}
                      to={item.path}
                      className={style.link}
                    >
                      {item.title}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Stack>
            <Stack>
              <Typography variant="body1" fontSize={20} fontWeight={700}>
                {t('footer.section_menu.title')}
              </Typography>
              <ul className={style.menu}>
                {ourMenu.map((item) => (
                  <li key={item.title} className={style.menuItem}>
                    <Typography
                      variant="body1"
                      component={Link}
                      to={item.path}
                      className={style.link}
                    >
                      {item.title}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Stack>
          </Stack>
        </Stack>
        <Stack flexDirection={{ md: 'column', lg: 'row' }} gap={{ xs: 9, md: 4, lg: 9 }}>
          <Stack>
            <Typography variant="body1" fontSize={20} fontWeight={700}>
              {t('footer.delivery_call')}
            </Typography>
            <RotatingPhone />
          </Stack>
          <Stack>
            <Typography variant="body1" fontSize={20} fontWeight={700} mb={1}>
              {t('footer.download_app_promo')}
            </Typography>
            <Stack direction={'row'} gap={4}>
              <Picture
                src={qrcode}
                alt="QR code for mobile app"
                width={96}
                height={96}
                className={style['qr-code']}
              />
              <Stack direction="column" gap={4}>
                <a href="https://apps.apple.com/" className={style.downloadBtns}>
                  <AppStore />
                </a>
                <a href="https://play.google.com/" className={style.downloadBtns}>
                  <GooglePlay />
                </a>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, mb: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Best Wok. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Developed by{' '}
          <Typography
            variant="body2"
            component={Link}
            to={'https://github.com/Bankai-NWC'}
            fontWeight={700}
          >
            Bankai-NWC
          </Typography>
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer
