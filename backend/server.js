import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoute.js";
import productRoutes from "./routes/ProductRoute.js";
import orderRoutes from "./routes/OrderRoute.js";
import cartRoutes from "./routes/CartRoute.js";
import cors from "cors";

const app = express()

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
