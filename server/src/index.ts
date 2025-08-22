import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import catalogRoutes from "./routes/catalog.routes"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}))

app.use(express.json())
connectDB()

app.use("/api", catalogRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
