import { ApiRoutes } from '@/constants/apiRoutes'
import { Product } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
