import express from "express";
import { getAllProducts, getSingleProduct } from "../Controllers/products.controllers.js";

const router = express.Router();

// 🔥 GET ALL PRODUCTS
router.get("/get-products", getAllProducts);
router.get("/get-product/:id", getSingleProduct);

export default router;