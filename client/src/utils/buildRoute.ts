import { AppRoutes } from '@/constants/appRoutes'

export const buildRoute = {
  catalog: (category: string) => AppRoutes.CATALOG.BASE.replace(':category', category),
  product: (category: string, productId: string | number) =>
    AppRoutes.PRODUCT.replace(':category', category).replace(':productId', String(productId)),
  promo: (promo: string) => AppRoutes.PROMO.replace(':id', promo),
}
