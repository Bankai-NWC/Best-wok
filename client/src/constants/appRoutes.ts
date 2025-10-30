export const AppRoutes = {
  HOME: '/',
  CATALOG: {
    BASE: '/catalog/:category',
    WOK: '/catalog/wok',
    ROLLS: '/catalog/rolls',
    POKE_BOWLS: '/catalog/poke-bouly',
    STREET_FOOD: '/catalog/street-food',
    SOUPS: '/catalog/soups',
  },
  PRODUCT: '/catalog/:category/:productId',
  CART: '/cart',
  ORDER: '/order',
  ABOUT: '/about-us',
  PROMO: '/promo',
  CONTACTS: '/contacts',
  PAYMENT_AND_DELIVERY: '/payment-and-delivery',
} as const
