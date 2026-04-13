import jwt from "jsonwebtoken";
import Doctor from "../Models/doctor.model.js";

export const protectDoctor = async (req, res, next) => {
  try {
    let token;

    // 🔥 1. COOKIE SE TOKEN
    if (req.cookies?.doctorToken) {
      token = req.cookies.doctorToken;
    }

    // 🔥 2. HEADER (fallback)
    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // 🔥 VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 FIND DOCTOR
    const doctor = await Doctor.findById(decoded.id).select("-password");

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // 🔥 ATTACH TO REQUEST
    req.doctor = doctor;

    next();
  } catch (error) {
    console.error("Auth Error:", error);

    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};