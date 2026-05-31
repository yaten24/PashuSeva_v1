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

// ================= GET DOCTOR APPOINTMENTS =================

export const getDoctorAppointments = async (req, res) => {
  try {
    // doctor id from auth middleware
    const doctorId = req.doctor._id;

    // fetch appointments
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email mobile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const allowedStatus = [
      "confirmed",
      "rejected",
      "completed",
    ];

    const normalizedStatus = status.toLowerCase();

    if (!allowedStatus.includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const appointment = await Appointment.findById(
      appointmentId
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Doctor Ownership Check
    if (
      appointment.doctor.toString() !==
      req.doctor._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Workflow Validation

    // Pending -> Confirmed / Rejected
    if (
      appointment.status === "pending" &&
      !["confirmed", "rejected"].includes(
        normalizedStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Pending appointment can only be confirmed or rejected",
      });
    }

    // Confirmed -> Completed
    if (
      normalizedStatus === "completed" &&
      appointment.status !== "confirmed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only confirmed appointments can be completed",
      });
    }

    appointment.status = normalizedStatus;

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: `Appointment marked as ${normalizedStatus}`,
      appointment,
    });
  } catch (error) {
    console.error("Update Appointment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};