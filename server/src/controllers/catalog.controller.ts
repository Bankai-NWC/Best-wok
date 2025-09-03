import { Request, Response } from "express"
import Product from "../models/product.model"

export const getCatalog = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch(err) {
    console.error("Error in getProducts:", err)
    res.status(500).json({ message: "Failed to fetch products", error: err })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Not found" })
    res.json(product)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      imageUrl,
      portion,
      ingredients,
      sale = 0,
      price,
      tags,
      category,
      nutritionalValue,
    } = req.body

    if (!name || !imageUrl || !portion || !ingredients || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const priceWithSale = sale > 0 ? Math.round(price * (1 - sale / 100)) : price

    const product = new Product({
      name,
      imageUrl,
      portion,
      ingredients,
      sale,
      price,
      priceWithSale,
      tags,
      category,
      nutritionalValue,
    })

    await product.save()
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
