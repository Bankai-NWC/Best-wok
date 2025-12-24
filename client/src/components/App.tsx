import { AppRoutes } from '@constants/appRoutes'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'

const Home = lazy(() => import('@pages/Home/Home'))
const Catalog = lazy(() => import('@pages/Catalog/Catalog'))
const Product = lazy(() => import('@pages/Product/Product'))
const Cart = lazy(() => import('@pages/Cart/Cart'))
const Order = lazy(() => import('@pages/Order/Order'))
const Promo = lazy(() => import('@pages/Promo/Promo'))
const DeliveryTerms = lazy(() => import('@pages/DeliveryTerms/DeliveryTerms'))
const Contacts = lazy(() => import('@pages/Contacts/Contacts'))
const About = lazy(() => import('@pages/About/About'))
const NotFound = lazy(() => import('@pages/NotFound/NotFound'))

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: AppRoutes.HOME,
          element: <Home />,
        },
        {
          path: AppRoutes.CATALOG.BASE,
          element: <Catalog />,
        },
        {
          path: AppRoutes.PRODUCT,
          element: <Product key={location.pathname} />,
        },
        {
          path: AppRoutes.CART,
          element: <Cart />,
        },
        {
          path: AppRoutes.ORDER,
          element: <Order />,
        },
        {
          path: AppRoutes.PROMO,
          element: <Promo />,
        },
        {
          path: AppRoutes.ABOUT,
          element: <About />,
        },
        {
          path: AppRoutes.CONTACTS,
          element: <Contacts />,
        },
        {
          path: AppRoutes.PAYMENT_AND_DELIVERY,
          element: <DeliveryTerms />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
