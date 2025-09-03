import { ApiRoutes } from '@/constants/apiRoutes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Product {
  _id: string
  name: { en: string; ua: string }
  imageUrl: string
  portion: number
  ingredients: { en: string; ua: string }
  sale: number
  price: number
  priceWithSale: number
  tags: { en: string[]; ua: string[] }
  category: { en: string; ua: string }
  nutritionalValue: {
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
    cellulose: number
  }
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    getCatalog: builder.query<Product[], void>({
      query: () => ApiRoutes.CATALOG,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `${ApiRoutes.CATALOG}/${id}`,
    }),
  }),
})

export const { useGetCatalogQuery, useGetProductByIdQuery } = api
