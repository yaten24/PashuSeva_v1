import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    landmark: {
      type: String,
      default: "",
    },

    addressLine: {
      type: String,
      required: true,
    },

    addressType: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "",
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
      minlength: 6,
      select: false, // security
    },

    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },

    location: {
      district: String,
      state: String,
    },

    // ✅ NEW: Aadhar Number
    aadharNumber: {
      type: String,
      unique: true,
      sparse: true,
      minlength: 12,
      maxlength: 12,
      select: false, // 🔒 sensitive data
    },

    // ✅ NEW: Multiple Delivery Addresses
    addresses: [addressSchema],

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

    googleId: {
      type: String,
      sparse: true,
    },

    authProvider: {
      type: String,
      enum: ["mobile", "google"],
      default: "mobile",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Index (fast search)
// userSchema.index({ mobile: 1 });
// userSchema.index({ email: 1 });

// ✅ Clean JSON response (remove sensitive fields)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otp;
  delete obj.otpExpiry;
  return obj;
};

export default mongoose.model("User", userSchema);