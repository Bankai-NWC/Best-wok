import { CartItem, CartState } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem('cartItems')
    if (serializedCart === null) {
      return []
    }
    return JSON.parse(serializedCart)
  } catch (e) {
    console.warn('Could not load cart from localStorage', e)
    return []
  }
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    addQiantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    clearCart: (state) => {
      state.items = []
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) {
        if (action.payload.quantity > 0) {
          item.quantity = action.payload.quantity
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id)
        }
      }
    },
  },
})

export const {
  addCartItem,
  addQiantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions
export const selectCartItems = (state: RootState) => state.cart.items
export const selectItemQuantity = (state: RootState, id: string) => {
  const item = state.cart.items.find((i) => i.id === id)
  return item ? item.quantity : 0
}
export const selectCartTotalPrice = (state: RootState) => {
  return state.cart.items.reduce((acc, item) => {
    const itemPrice = item.sale > 0 ? item.priceWithSale : item.price

    return acc + itemPrice * item.quantity
  }, 0)
}
export default cartSlice.reducer
