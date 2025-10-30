import MenuSlider from '@/components/ui/Sliders/MenuSlider/MenuSlider'
import { AppRoutes } from '@/constants/appRoutes'
import { CategoryImages } from '@/constants/images'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { MenuItem } from '@/types'
import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Footer from '@ui/Footer/Footer'
import Header from '@ui/Header/Header'
import { Outlet, useLocation, useMatch } from 'react-router-dom'

function Layout() {
  useScrollToTop()
  const { streetFood, rolls, wok, salads, soups } = CategoryImages

  const isHome = useLocation().pathname === '/'
  const isDeliveryTermsPage = useMatch(AppRoutes.PAYMENT_AND_DELIVERY)
  const isAboutPage = useMatch(AppRoutes.ABOUT)
  const isContactsPage = useMatch(AppRoutes.CONTACTS)
  const isCategoryPage = useMatch(AppRoutes.CATALOG.BASE)
  const isProductPage = useMatch(AppRoutes.PRODUCT)

  const shouldShowMenu =
    isHome ||
    isCategoryPage ||
    isProductPage ||
    isDeliveryTermsPage ||
    isAboutPage ||
    isContactsPage

  const menuItems: MenuItem[] = [
    { text: 'menu.category.wok', imageSrc: wok, route: 'wok' },
    { text: 'menu.category.rolls', imageSrc: rolls, route: 'rolls' },
    { text: 'menu.category.poke-bouly', imageSrc: salads, route: 'poke-bouly' },
    { text: 'menu.category.street-food', imageSrc: streetFood, route: 'street-food' },
    { text: 'menu.category.soups', imageSrc: soups, route: 'soups' },
  ]

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
        <Outlet />
      </Box>
      <Footer />
    </Container>
  )
}

export default Layout
