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
};