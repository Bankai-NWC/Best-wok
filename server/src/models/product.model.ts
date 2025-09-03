import mongoose, { Schema, Document } from "mongoose"

export interface IProduct extends Document {
  name: { en: string; ua: string }
  imageUrl: string
  portion: number
  ingredients: { en: string; ua: string }
  sale: number
  price: number
  priceWithSale: number
  tags: { en: string[]; ua: string[] }
  category: { en: string; ua: string }
  nutritionalValue: { calories: number, proteins: number, fats: number, carbohydrates: number, cellulose: number}
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
    },
    imageUrl: { type: String, required: true },
    portion: { type: Number, required: true },
    ingredients: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
    },
    sale: { type: Number, default: 0 },
    price: { type: Number, required: true },
    priceWithSale: { type: Number, required: true, default: 0 },
    tags: {
      en: { type: [String], default: [] },
      ua: { type: [String], default: [] },
    },
    category: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
    },
    nutritionalValue: {
      calories: { type: Number, default: 0 },
      proteins: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
      carbohydrates: { type: Number, default: 0 },
      cellulose: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IProduct>("Product", ProductSchema)
