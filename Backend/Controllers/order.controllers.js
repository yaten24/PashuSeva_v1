// controllers/orderController.js

import Order from "../Models/order.model.js";
import Product from "../Models/product.model.js";

// BUY PRODUCT / CREATE ORDER
export const buyProductController = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      productId,
      quantity,
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

    if (
      !quantity ||
      Number(quantity) < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    if (!price || !gst || !total) {
      return res.status(400).json({
        success: false,
        message: "Price details missing",
      });
    }

    // FIND PRODUCT

    const product = await Product.findById(
      productId
    );

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

    // STOCK VALIDATION

    if (
      product.stock &&
      Number(quantity) >
        Number(product.stock)
    ) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`,
      });
    }

    // PAYMENT

    const method =
      paymentMethod === "online"
        ? "online"
        : "cash";

    const paymentStatus =
      paymentMethod === "online"
        ? "paid"
        : "pending";

    // CREATE ORDER

    const order = await Order.create({
      user: userId,

      seller: product.seller,

      product: product._id,

      quantity: Number(quantity),

      address: addressId,

      // PRICE DETAILS

      price: Number(price),

      gst: Number(gst),

      platformFee:
        Number(platformFee) || 0,

      deliveryFee:
        Number(delivery) || 0,

      totalAmount: Number(total),

      // PAYMENT DETAILS

      payment: {
        method,
        status: paymentStatus,
        transactionId:
          transactionId || "",
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

    // STOCK UPDATE

    if (
      product.stock !== undefined &&
      product.stock !== null
    ) {
      product.stock =
        Number(product.stock) -
        Number(quantity);

      await product.save();
    }

    // POPULATE ORDER

    const populatedOrder =
      await Order.findById(order._id)
        .populate(
          "user",
          "name email phone"
        )
        .populate(
          "seller",
          "name email phone"
        )
        .populate(
          "product",
          "name images price"
        );

    return res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.log(
      "BUY PRODUCT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
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

export const getSellerOrders = async (
  req,
  res
) => {
  try {
    console.log("aa gya 1")
    const sellerId =
      req.user._id;
      console.log("aa gya")

    const orders =
      await Order.find({
        seller: sellerId,
      })
        .populate(
          "user",
          "name email mobile"
        )
        .populate(
          "product",
          "name price images"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(
      "GET SELLER ORDERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch seller orders",
      error: error.message,
    });
  }
};


export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { orderId } =
      req.params;

    const { status } =
      req.body;

    const sellerId =
      req.user._id;

    const allowedStatuses =
      [
        "accepted",
        "rejected",
        "in_progress",
        "completed",
      ];

    if (
      !allowedStatuses.includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order status",
      });
    }

    const order =
      await Order.findOne({
        _id: orderId,
        seller: sellerId,
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    // Prevent changes after completed/rejected

    if (
      order.status ===
        "completed" ||
      order.status ===
        "rejected"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order can no longer be updated",
      });
    }

    // Status Flow Validation

    const validTransitions = {
      pending: [
        "accepted",
        "rejected",
      ],

      accepted: [
        "in_progress",
      ],

      in_progress: [
        "completed",
      ],
    };

    if (
      !validTransitions[
        order.status
      ]?.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Cannot change status from ${order.status} to ${status}`,
      });
    }

    order.status = status;

    order.statusHistory.push({
      status,
      updatedAt:
        new Date(),
    });

    await order.save();

    const updatedOrder =
      await Order.findById(
        order._id
      )
        .populate(
          "user",
          "name email mobile"
        )
        .populate(
          "product",
          "name price images"
        );

    return res.status(200).json({
      success: true,
      message:
        "Order status updated successfully",
      order:
        updatedOrder,
    });
  } catch (error) {
    console.log(
      "UPDATE ORDER STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server Error",
      error:
        error.message,
    });
  }
};