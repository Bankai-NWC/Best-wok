type LocalizedString = {
  en: string
  ua: string
}

type LocalizedStringArray = {
  en: string[]
  ua: string[]
}

export interface Product {
  _id: string
  name: LocalizedString
  imageUrl: string
  portion: number
  ingredients: LocalizedString
  sale: number
  price: number
  priceWithSale: number
  tags: LocalizedStringArray
  category: LocalizedString
  nutritionalValue: {
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
    cellulose: number
  }
}

type BaseProductView = Omit<Product, '_id' | 'category' | 'tags' | 'nutritionalValue'>

export type ProductView = BaseProductView & {
  id: string
  category: string
  tags: string[]
}

export type ProductCardProps = ProductView

export type CartItem = Omit<ProductView, 'tags'> & {
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

export type CartProductCardProps = Omit<ProductView, 'tags' | 'portion'>

export type ProductCardChipProps = Pick<ProductView, 'id' | 'tags'>

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

type Slide = {
  image: string
  link?: string
  alt?: string
}

export type ProductSliderProps = {
  title: string
  products: Product[] | undefined
  link?: string
}

export type PromoSliderProps = {
  slides?: Slide[]
}


