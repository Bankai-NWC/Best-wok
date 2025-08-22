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
    priceWithSale: { type: Number, required: true },
    tags: {
      en: { type: [String], default: [] },
      ua: { type: [String], default: [] },
    },
    category: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IProduct>("Product", ProductSchema)
