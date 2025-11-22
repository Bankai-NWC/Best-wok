import MenuSlider from '@/components/ui/Sliders/MenuSlider/MenuSlider'
import { AppRoutes } from '@/constants/appRoutes'
import { CategoryImages } from '@/constants/images'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { MenuItem } from '@/types'
import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Footer from '@ui/Footer/Footer'
import Header from '@ui/Header/Header'
import { Suspense } from 'react'
import { Outlet, useLocation, useMatch } from 'react-router-dom'

const { streetFood, rolls, wok, salads, soups } = CategoryImages

const menuItems: MenuItem[] = [
  { text: 'menu.category.wok', imageSrc: wok, route: 'wok' },
  { text: 'menu.category.rolls', imageSrc: rolls, route: 'rolls' },
  { text: 'menu.category.poke-bouly', imageSrc: salads, route: 'poke-bouly' },
  { text: 'menu.category.street-food', imageSrc: streetFood, route: 'street-food' },
  { text: 'menu.category.soups', imageSrc: soups, route: 'soups' },
]

function Layout() {
  const isHome = useLocation().pathname === '/'
  const isDeliveryTermsPage = useMatch(AppRoutes.PAYMENT_AND_DELIVERY)
  const isAboutPage = useMatch(AppRoutes.ABOUT)
  const isContactsPage = useMatch(AppRoutes.CONTACTS)
  const isPromoPage = useMatch(AppRoutes.PROMO)
  const isCategoryPage = useMatch(AppRoutes.CATALOG.BASE)
  const isProductPage = useMatch(AppRoutes.PRODUCT)

  const shouldShowMenu =
    isHome ||
    isCategoryPage ||
    isProductPage ||
    isDeliveryTermsPage ||
    isAboutPage ||
    isContactsPage ||
    isPromoPage

  useScrollToTop()

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
        px: { xs: 4, lg: 0 },
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1, minHeight: '100vh' }}>
        {shouldShowMenu && <MenuSlider items={menuItems} />}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Container>
  )
}

export default Layout
