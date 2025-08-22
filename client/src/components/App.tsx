import { Routes } from '@constants/appRoutes'
import Catalog from '@pages/Catalog/Catalog'
import Home from '@pages/Home/Home'
import CreateProductForm from '@pages/NewProduct/CreateProductForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: Routes.HOME,
          element: <Home />,
        },
        {
          path: Routes.CATALOG,
          element: <Catalog />,
        },
        {
          path: Routes.PRODUCT,
          element: <div>Product Page</div>,
        },
        {
          path: Routes.CART,
          element: <div>Cart Page</div>,
        },
        {
          path: Routes.ORDER,
          element: <div>Order Page</div>,
        },
        {
          path: '/create-product',
          element: <CreateProductForm />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
