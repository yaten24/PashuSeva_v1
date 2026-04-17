import express from "express";
import {loginUserController, registerUserController, verifyMe} from "../Controllers/user.controllers.js"
import protect from "../Middlewares/userAuth.middleware.js";
import { addAddress, getUserAddresses } from "../Controllers/address.controller.js";

const router = express.Router();

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.get("/auth/me",protect, verifyMe)

router.post("/address/add",protect, addAddress)
router.get("/address/get",protect, getUserAddresses)



// router.post("/send-otp", sendOtpController);
// router.post("/verify-otp", verifyOtpController);
// router.post("/google-login", googleLoginController);



export default router;