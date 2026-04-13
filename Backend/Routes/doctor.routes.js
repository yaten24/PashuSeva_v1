import express from "express"
import { loginDoctorController, logoutDoctorController, registerDoctorController } from "../Controllers/doctor.controllers.js";
import { protectDoctor } from "../Middlewares/doctorAuth.middleware.js";

const router = express.Router();

router.post("/register", registerDoctorController);
router.post("/login", loginDoctorController);
router.post("/logout", logoutDoctorController );

router.get("/auth/me", protectDoctor, (req, res) => {
  res.json({
    success: true,
    doctor: req.doctor,
  });
});

export default router;