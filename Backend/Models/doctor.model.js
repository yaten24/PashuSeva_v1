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

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
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

    phone: String,

    profileImage: String,

    // 🔹 Specialization
    specialization: {
      type: String,
      required: true, // e.g. Veterinary
    },

    experience: {
      type: Number, // years
      default: 0,
    },

    consultationFee: {
      type: Number,
      required: true,
    },

    // 🔹 Rating
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    reviews: [reviewSchema],

    // 🔹 Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    documents: {
      degreeCertificate: String,
      license: String,
    },

    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);