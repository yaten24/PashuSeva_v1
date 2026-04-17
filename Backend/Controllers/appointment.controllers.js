// controllers/appointmentController.js

import Appointment from "../Models/appointment.model.js";
import Doctor from "../Models/doctor.model.js";

export const bookAppointment = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId)

    const {
      doctorId,
      animalType,
      problemDescription,
      date,
      time,
      paymentMethod,
    } = req.body;

    // Validation
    if (
      !doctorId ||
      !animalType ||
      !problemDescription ||
      !date ||
      !time ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Doctor Find
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Doctor fee
    const consultationFee = doctor.consultationFee || 0;

    // Create Appointment
    const appointment = await Appointment.create({
      user: userId,
      doctor: doctorId,
      animalType,
      problemDescription,
      date,
      time,
      paymentMethod,

      fee: consultationFee, // 🔥 save fee here

      paymentStatus:
        paymentMethod === "online" ? "pending" : "cash",

    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.log("Book Appointment Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({
      user: userId,
    })
      .populate(
        "doctor",
        "name mobile specialization consultationFee location"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log(
      "Get User Appointments Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};