import express from "express";
import protect from "../Middlewares/userAuth.middleware.js";
import { bookAppointment, getUserAppointments } from "../Controllers/appointment.controllers.js";

const router = express.Router();

// user login required
router.post("/book", protect, bookAppointment);
router.get("/my", protect, getUserAppointments);

export default router;