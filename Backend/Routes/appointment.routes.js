import express from "express";
import protect from "../Middlewares/userAuth.middleware.js";
import { bookAppointment, getDoctorAppointments, getUserAppointments, updateAppointmentStatus } from "../Controllers/appointment.controllers.js";
import { protectDoctor } from "../Middlewares/doctorAuth.middleware.js";

const router = express.Router();

// user login required
router.post("/book", protect, bookAppointment);
router.get("/my", protect, getUserAppointments);

router.get("/doctor-appointment", protectDoctor , getDoctorAppointments);
router.put( "/update-status/:appointmentId", protectDoctor, updateAppointmentStatus );

export default router;