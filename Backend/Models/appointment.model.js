import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // 🔹 Animal Info
    animalType: {
      type: String, // Cow, Buffalo, Goat
      required: true,
    },

    problemDescription: {
      type: String,
      required: true,
    },

    // 🔹 Schedule
    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
    },

    // 🔹 Payment
    fee: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cash"],
      default: "pending",
    },

    // 🔹 Status Flow
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);