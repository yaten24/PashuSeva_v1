import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 🔹 User who booked the service
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Seller (worker/service provider)
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    // 🔹 Pricing
    totalAmount: {
      type: Number,
      required: true,
    },

    platformFee: {
      type: Number,
      default: 0,
    },

    sellerEarning: {
      type: Number,
    },

    // 🔹 Payment Info
    payment: {
      method: {
        type: String,
        enum: ["cash", "online"],
        default: "cash",
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },
      transactionId: String,
    },

    // 🔹 Order Status Flow (VERY IMPORTANT)
    status: {
      type: String,
      enum: [
        "pending",     // order placed
        "accepted",    // seller accepted
        "rejected",    // seller rejected
        "in_progress", // work started
        "completed",   // finished
        "cancelled",   // cancelled
      ],
      default: "pending",
    },

    // 🔹 Tracking Timeline (for UI)
    statusHistory: [
      {
        status: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // 🔹 Notes
    userNote: String,
    sellerNote: String,

    // 🔹 Rating after completion
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    review: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);