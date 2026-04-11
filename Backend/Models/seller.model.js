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
      sparse: true,
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
      select: false,
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

    // 🔹 Business Info (NEW)
    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔹 Location
    location: {
      city: String,
      state: String,
    },

    // 🔹 Bank Details (NEW)
    bankDetails: {
      accountHolderName: {
        type: String,
      },
      accountNumber: {
        type: String,
        select: false, // 🔒 sensitive
      },
      ifscCode: {
        type: String,
      },
      bankName: {
        type: String,
        default: "",
      },
    },

    // 🔹 KYC Details (NEW)
    aadharNumber: {
      type: String,
      unique: true,
      sparse: true,
      minlength: 12,
      maxlength: 12,
      select: false, // 🔒 hide
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

    otp: {
      type: String,
      select: false, // 🔒 hide OTP
    },

    otpExpiry: {
      type: Date,
      select: false,
    },

    // 🔹 Wallet
    walletBalance: {
      type: Number,
      default: 0,
    },

    // 🔹 NEW: Admin Approval System
    adminApproval: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvedAt: {
      type: Date,
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ✅ Clean JSON response
sellerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.bankDetails?.accountNumber;
  delete obj.aadharNumber;
  return obj;
};

export default mongoose.model("Seller", sellerSchema);