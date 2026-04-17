import express from "express";
import protect from "../Middlewares/userAuth.middleware.js";
import { buyProductController, getSingleOrderController, getUserOrdersController } from "../Controllers/order.controllers.js";

const router = express.Router();

/*
========================================
ORDER ROUTES
========================================
*/

// BUY PRODUCT / PLACE ORDER
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

export default router;