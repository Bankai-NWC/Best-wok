import { ApiRoutes } from '@/constants/apiRoutes'
import { Product } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_API_URL

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
