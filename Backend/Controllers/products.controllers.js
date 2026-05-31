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

export const getSellerProducts = async (
  req,
  res
) => {
  try {
    const sellerId = req.user._id;

    const products =
      await Product.find({
        seller: sellerId,
      })
        .sort({
          createdAt: -1,
        })
        .populate(
          "category",
          "name"
        );

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(
      "GET SELLER PRODUCTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch products",
      error: error.message,
    });
  }
};

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const { productId } =
      req.params;

    const sellerId =
      req.user._id;

    const product =
      await Product.findOne({
        _id: productId,
        seller: sellerId,
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    await Product.findByIdAndDelete(
      productId
    );

    return res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Delete failed",
    });
  }
};

export const updateProductStock =
  async (req, res) => {
    try {
      const { productId } =
        req.params;

      const { stock } =
        req.body;

      const sellerId =
        req.user._id;

      const product =
        await Product.findOne({
          _id: productId,
          seller: sellerId,
        });

      if (!product) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Product not found",
          });
      }

      product.stock =
        Number(stock);

      await product.save();

      return res.status(200).json({
        success: true,
        message:
          "Stock updated successfully",
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Update failed",
      });
    }
  };

export const getHomeProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find({
        isActive: true,
      })
        .populate(
          "seller",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .limit(4);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(
      "HOME PRODUCTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch products",
      error: error.message,
    });
  }
};

export const searchProducts =
  async (req, res) => {
    try {
      const {
        q,
        category,
      } = req.query;

      const filter = {
        isActive: true,
      };

      if (q) {
        filter.name = {
          $regex: q,
          $options: "i",
        };
      }

      if (
        category &&
        category !== "all"
      ) {
        filter.category =
          category;
      }

      const products =
        await Product.find(
          filter
        )
          .populate(
            "seller",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        count:
          products.length,
        products,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Search failed",
      });
    }
  };