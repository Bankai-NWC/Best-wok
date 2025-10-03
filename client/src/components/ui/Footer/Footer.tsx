import qrcode from '@assets/images/qrcode.png'
import logo from '@assets/logo.svg'
import { AppRoutes } from '@constants/appRoutes'
import { svgs } from '@constants/svgs'
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { scrollToTop } from '@utils/scrollToTop'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import style from './Footer.module.scss'

function Footer() {
  const { AppStore, GooglePlay } = svgs
  const { t } = useTranslation()
  const theme = useTheme()

  const about = [
    { title: t('footer.about.aboutUs'), path: AppRoutes.ABOUT },
    { title: t('footer.about.contacts'), path: AppRoutes.CONTACTS },
    { title: t('footer.about.paymentAndDelivery'), path: AppRoutes.PAYMENT_AND_DELIVERY },
    { title: t('footer.about.promotions'), path: AppRoutes.PROMOTIONS },
  ]

  const ourMenu = [
    { title: t('footer.ourMenu.wok'), path: '/catalog/wok' },
    { title: t('footer.ourMenu.rolls'), path: '/catalog/rolls' },
    { title: t('footer.ourMenu.poke-bouly'), path: '/catalog/poke-bouly' },
    { title: t('footer.ourMenu.streetFood'), path: '/catalog/street-food' },
    { title: t('footer.ourMenu.soups'), path: '/catalog/soups' },
  ]

  return (
    <>
      <Divider sx={{ mt: 12, mb: 2, color: '#1c1c1e' }} />
      <Box component={'footer'}>
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
              <Link to={AppRoutes.HOME} onClick={scrollToTop}>
                <img src={logo} alt="BEST WOK" />
              </Link>
            </div>
            <Stack direction="row" gap={9}>
              <Stack>
                <Typography variant="body1" fontSize={20} fontWeight={700}>
                  {t('footer.about.title')}
                </Typography>
                <ul className={style.menu}>
                  {about.map((item) => (
                    <li key={item.title} className={style.menuItem}>
                      <Typography
                        variant="body1"
                        component={Link}
                        to={item.path}
                        className={style.link}
                        onClick={scrollToTop}
                      >
                        {item.title}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Stack>
              <Stack>
                <Typography variant="body1" fontSize={20} fontWeight={700}>
                  {t('footer.ourMenu.title')}
                </Typography>
                <ul className={style.menu}>
                  {ourMenu.map((item) => (
                    <li key={item.title} className={style.menuItem}>
                      <Typography
                        variant="body1"
                        component={Link}
                        to={item.path}
                        className={style.link}
                        onClick={scrollToTop}
                      >
                        {item.title}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="body1" fontSize={20} fontWeight={700} mb={1}>
              {t('footer.delivery')}
            </Typography>
            <Stack direction={'row'} gap={4}>
              <Stack>
                <Typography
                  component={'a'}
                  href="tel:+38 (050) 123 45 67"
                  variant="body1"
                  color={theme.palette.text.primary}
                >
                  +38 (050) 123 45 67
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  {t('workingHours')}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="body1" fontSize={20} fontWeight={700} mb={1}>
              {t('footer.downloadApp')}
            </Typography>
            <Stack direction={'row'} gap={4}>
              <img
                src={qrcode}
                alt="QR code for mobile app"
                width={96}
                height={96}
                style={{ borderRadius: 6 }}
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
    </>
  )
}

export default Footer
