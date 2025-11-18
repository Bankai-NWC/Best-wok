import { Middleware } from '@reduxjs/toolkit'

type CartAwareState = {
  cart: {
    items: unknown[]
  }
}

export const cartSyncMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)

  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as { type: unknown }).type === 'string'
  ) {
    if ((action as { type: string }).type.startsWith('cartSlice/')) {
      try {
        const state = store.getState() as CartAwareState
        const cartItems = state.cart.items

        localStorage.setItem('cartItems', JSON.stringify(cartItems))
      } catch (e) {
        console.warn('Could not save cart to local storage', e)
      }
    }
  }

  return result
}
