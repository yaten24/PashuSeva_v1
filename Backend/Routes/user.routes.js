import express from "express";
import {loginUserController, registerUserController, verifyMe} from "../Controllers/user.controllers.js"
import protect from "../Middlewares/userAuth.middleware.js";

const router = express.Router();

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.get("/auth/me",protect, verifyMe)

// router.post("/send-otp", sendOtpController);
// router.post("/verify-otp", verifyOtpController);
// router.post("/google-login", googleLoginController);

export default router;