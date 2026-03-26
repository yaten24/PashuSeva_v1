import express from "express"
import { loginSellerController, registerSellerController } from "../Controllers/seller.controllers.js";

const router = express.Router();

router.post("/register", registerSellerController);
router.post("/login", loginSellerController);

export default router;