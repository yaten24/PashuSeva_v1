import mongoose from "mongoose";
import Product from "../Models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      stock,
      city,
      state,
    } = req.body;
    console.log("entered")
    // 🔥 Seller from token (IMPORTANT)
    const sellerId = req.user?.id; // JWT middleware se aayega

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 🔥 Images path
    const imagePaths = req.files.map(
      (file) => file.path
    );

    // Create product
    const product = await Product.create({
      seller: sellerId,
      name,
      description,
      category,
      price,
      stock,
      images: imagePaths,
      location: {
        city,
        state,
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

// 🔥 GET ALL PRODUCTS CONTROLLER
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .select("name category price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // valid mongo id check
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(id)
      .populate("seller", "name mobile email shopName");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Get Single Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product details",
    });
  }
};