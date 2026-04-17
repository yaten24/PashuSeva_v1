// controllers/orderController.js

import Order from "../Models/order.model.js";
import Product from "../Models/product.model.js";

// BUY PRODUCT / CREATE ORDER
export const buyProductController = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      productId,
      addressId,
      paymentMethod,
      price,
      gst,
      platformFee,
      delivery,
      total,
      transactionId,
    } = req.body;

    // VALIDATION
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    if (!price || !gst || !total) {
      return res.status(400).json({
        success: false,
        message: "Price details missing",
      });
    }

    // FIND PRODUCT
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // CHECK SELLER
    if (!product.seller) {
      return res.status(400).json({
        success: false,
        message: "Seller not found",
      });
    }

    // PAYMENT TYPE
    const method =
      paymentMethod === "online" ? "online" : "cash";

    const paymentStatus =
      paymentMethod === "online" ? "paid" : "pending";

    // CREATE ORDER
    const order = await Order.create({
      user: userId,
      seller: product.seller,
      product: product,
      address :addressId,

      // PRICE INFO
      price: Number(price),
      gst: Number(gst),
      platformFee: Number(platformFee) || 0,
      deliveryFee: Number(delivery) || 0,
      totalAmount: Number(total),

      // PAYMENT
      payment: {
        method,
        status: paymentStatus,
        transactionId: transactionId || "",
      },

      // ORDER STATUS
      status: "pending",

      statusHistory: [
        {
          status: "pending",
          updatedAt: new Date(),
        },
      ],
    });

    // POPULATE RESPONSE
    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email phone")
      .populate("seller", "name email phone");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.log("BUY PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("product", "name")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((item) => ({
      orderId: item._id,
      productName: item.product?.name || "Product Deleted",
      totalAmount: item.totalAmount,
      status: item.status,
    }));

    return res.status(200).json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error) {
    console.log("GET USER ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// controllers/orderController.js

export const getSingleOrderController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    })
      .populate(
        "product",
        "name price category image images description"
      )
      .populate(
        "seller",
        "name email phone image shopName address"
      )
      .populate(
        "address",
        "fullName mobile alternateMobile pincode state city area landmark houseNo addressType isDefault"
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(
      "GET SINGLE ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};