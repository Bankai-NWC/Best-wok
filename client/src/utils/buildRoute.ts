import { AppRoutes } from "@/constants/appRoutes";

export const buildRoute = {
  catalog: (category: string) => AppRoutes.CATALOG.replace(':category', category),
  product: (category: string, productId: string | number) =>
    AppRoutes.PRODUCT.replace(':category', category).replace(':productId', String(productId)),
}