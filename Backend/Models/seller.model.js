import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

const sellerSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // security
    },

    profileImage: {
      type: String,
      default: "",
    },

    // 🔹 Role
    role: {
      type: String,
      enum: ["seller"],
      default: "seller",
    },

    location: {
      city: String,
      state: String,
    },

    // 🔹 Ratings & Reviews
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    reviews: [reviewSchema],


    // 🔹 Work Status
    isVerified: {
      type: Boolean,
      default: false,
    },

    // 🔹 Wallet (for future payments system)
    walletBalance: {
      type: Number,
      default: 0,
    },

    // 🔹 Account Status
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);