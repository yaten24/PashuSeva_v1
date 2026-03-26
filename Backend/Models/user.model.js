import mongoose from "mongoose";

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
      city: String,
      state: String,
    },

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