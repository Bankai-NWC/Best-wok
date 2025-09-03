import { Router } from "express"
import { getCatalog, getProductById, createProduct } from "../controllers/catalog.controller"

const router = Router()

router.get("/catalog", getCatalog)
router.get("/catalog/:id", getProductById)
router.post("/", createProduct)

export default router
