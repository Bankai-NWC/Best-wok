export interface Product {
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

export type ProductCardProps = {
  id: string
  name: { en: string; ua: string }
  imageUrl: string
  sale: number
  price: number
  priceWithSale: number
  portion: number
  ingredients: { en: string; ua: string }
  tags: string[]
  category: string
}

export type CartItem = {
  id: string
  name: { en: string; ua: string }
  imageUrl: string
  portion: number
  sale: number
  price: number
  priceWithSale: number
  ingredients: { en: string; ua: string }
  category: string
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

export type CartProductCardProps = {
  id: string
  name: { en: string; ua: string }
  imageUrl: string
  sale: number
  price: number
  priceWithSale: number
  ingredients: { en: string; ua: string }
  category: string
}

export type CatalogParams = {
  category: string
}

export type ModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type MenuItem = {
  text: string
  imageSrc: string
  route: string
}

export type ProductCardChipProps = {
  id: string
  tags: string[]
}

export type CustomButtonProps = {
  type?: 'outlined' | 'contained'
  maxWidth?: number
  text?: string
  symbol?: string
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  onClick?: () => void
}

export type QuantitySelectorProps = {
  productId: string
}

export interface CategoryButtonProps {
  imageSrc: string
  text: string
  onClick?: () => void
}
