import { Router } from "express"
import { getCatalog, getProductById, createProduct } from "../controllers/catalog.controller"

const router = Router()

router.get("/", getCatalog)
router.get("/:id", getProductById)
router.post("/products", createProduct)

export default router
