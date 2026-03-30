import express from "express"
import { loginSellerController, registerSellerController } from "../Controllers/seller.controllers.js";
import upload from "../Middlewares/uploadMiddleware.js";
import { createProduct } from "../Controllers/products.controllers.js";
import { protectSeller } from "../Middlewares/sellerAuth.middleware.js";

const router = express.Router();

router.post("/register", registerSellerController);
router.post("/login", loginSellerController);

router.post(
  "/product/create",
  protectSeller, // JWT auth middleware
  upload.array("images", 5), // max 5 images
  createProduct
);

export default router;