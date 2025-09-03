import { configureStore } from '@reduxjs/toolkit'
import { api } from '@store/services/api'
import cartSlice from '@store/slices/cartSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
