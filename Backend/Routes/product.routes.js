import express from "express";
import { deleteProduct, getAllProducts, getHomeProducts, getSellerProducts, getSingleProduct, searchProducts, updateProductStock } from "../Controllers/products.controllers.js";
import { protectSeller } from "../Middlewares/sellerAuth.middleware.js";
import protect from "../Middlewares/userAuth.middleware.js";
import { checkFavorite, getFavorites, toggleFavorite } from "../Controllers/favorite.controller.js";

const router = express.Router();

// 🔥 GET ALL PRODUCTS
router.get("/get-products", getAllProducts);
router.get("/get-product/:id", getSingleProduct);

router.get(
  "/seller-products",
  protectSeller,
  getSellerProducts
);

router.delete(
  "/delete/:productId",
  protectSeller,
  deleteProduct
);

router.put(
  "/update-stock/:productId",
  protectSeller,
  updateProductStock
);

router.get(
  "/home-products",
  getHomeProducts
);

router.get(
  "/search",
  searchProducts
);

router.post(
  "/toggle/:productId",
  protect,
  toggleFavorite
);

router.get(
  "/check/:productId",
  protect,
  checkFavorite
);

router.get(
  "/my-favorites",
  protect,
  getFavorites
);


export default router;