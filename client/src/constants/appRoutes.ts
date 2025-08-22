export enum Routes {
  HOME = '/',
  CATALOG = '/catalog/:category',
  PRODUCT = '/catalog/:category/:productId',
  CART = '/cart',
  ORDER = '/order',
}

export const buildRoute = {
  catalog: (category: string) => Routes.CATALOG.replace(':category', category),
  product: (category: string, productId: string | number) =>
    Routes.PRODUCT.replace(':category', category).replace(':productId', String(productId)),
}
