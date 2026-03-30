// import express from "express";
// import { createProduct } from "../controllers/productController.js";
// import upload from "../Middlewares/uploadMiddleware.js"
// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // 🔥 Create Product Route
// router.post(
//   "/create",
//   protect, // JWT auth middleware
//   upload.array("images", 5), // max 5 images
//   createProduct
// );

// export default router;