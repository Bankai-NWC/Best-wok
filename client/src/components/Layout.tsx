import { CategoryImages } from '@/constants/images'
import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Footer from '@ui/Footer/Footer'
import Header from '@ui/Header/Header'
import Menu from '@ui/Menu/Menu'
import { Outlet, useLocation, useMatch } from 'react-router-dom'

function Layout() {
  const { streetFood, rolls, wok, sushi, soups } = CategoryImages

  const isHome = useLocation().pathname === '/'
  const isCategoryPage = useMatch('/catalog/:category')
  const isProductPage = useMatch('/catalog/:category/:productId')

  const shouldShowMenu = isHome || (isCategoryPage && !isProductPage)

  type MenuItem = {
    text: string
    imageSrc: string
    route: string
  }

  const menuItems: MenuItem[] = [
    { text: 'category.wok', imageSrc: wok, route: 'wok' },
    { text: 'category.rolls', imageSrc: rolls, route: 'rolls' },
    { text: 'category.sushi', imageSrc: sushi, route: 'sushi' },
    { text: 'category.street-food', imageSrc: streetFood, route: 'street-food' },
    { text: 'category.soups', imageSrc: soups, route: 'soups' },
  ]

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        px: { xs: 4, lg: 0 },
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1, minHeight: '100vh' }}>
        {shouldShowMenu && <Menu items={menuItems} />}
        <Outlet />
      </Box>
      <Footer />
    </Container>
  )
}

export default Layout
