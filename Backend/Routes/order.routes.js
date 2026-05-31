import express from "express";
import protect from "../Middlewares/userAuth.middleware.js";
import { buyProductController, getSellerOrders, getSingleOrderController, getUserOrdersController } from "../Controllers/order.controllers.js";
import { protectSeller } from "../Middlewares/sellerAuth.middleware.js";

const router = express.Router();

/*
========================================
ORDER ROUTES
========================================
*/

// BUY PRODUCT / PLACE ORDER/seller-orders
router.post(
  "/buy-product",
  protect,
  buyProductController
);

router.get(
  "/my-orders",
  protect,
  getUserOrdersController
);

router.get(
  "/:orderId",
  protect,
  getSingleOrderController
);

router.get(
  "/seller-order",
  protectSeller,
  getSellerOrders
);

export default router;