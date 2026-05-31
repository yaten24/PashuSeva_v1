import express from "express"
import { getDoctorsList, getHomeDoctors, loginDoctorController, logoutDoctorController, registerDoctorController } from "../Controllers/doctor.controllers.js";
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


router.get("/get-doctors", getDoctorsList);

router.get(
  "/home-doctors",
  getHomeDoctors
);


export default router;