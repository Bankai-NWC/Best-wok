import { AppRoutes } from '@constants/appRoutes'
import Cart from '@pages/Cart/Cart'
import Catalog from '@pages/Catalog/Catalog'
import Home from '@pages/Home/Home'
import CreateProductForm from '@pages/NewProduct/CreateProductForm'
import NotFound from '@pages/NotFound/NotFound'
import Product from '@pages/Product/Product'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'

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
          element: <Product />,
        },
        {
          path: AppRoutes.CART,
          element: <Cart />,
        },
        {
          path: AppRoutes.ORDER,
          element: <div>Order Page</div>,
        },
        {
          path: AppRoutes.PROMO,
          element: <div>Promo Page</div>,
        },
        {
          path: '/create-product',
          element: <CreateProductForm />,
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
