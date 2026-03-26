import express from "express"
import { loginDoctorController, logoutDoctorController, registerDoctorController } from "../Controllers/doctor.controllers.js";

const router = express.Router();

router.post("/register", registerDoctorController);
router.post("/login", loginDoctorController);
router.post("/logout", logoutDoctorController );

export default router;