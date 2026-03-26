import Doctor from "../Models/doctor.model.js";
import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

export const registerDoctorController = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      specialization,
      experience,
      consultationFee,
    } = req.body;

    // 🔹 1. Validation
    if (!name || !mobile || !password || !specialization || !consultationFee) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // 🔹 Email format check (optional but recommended)
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 🔹 Mobile validation (India)
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    // 🔹 2. Check Existing Doctor
    const existingDoctor = await Doctor.findOne({
      $or: [{ mobile }, { email }],
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already registered with this mobile/email",
      });
    }

    // 🔹 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 4. Create Doctor
    const doctor = await Doctor.create({
      name: name.trim(),
      email: email?.trim().toLowerCase(),
      mobile: mobile.trim(),
      password: hashedPassword,
      specialization,
      experience: experience || 0,
      consultationFee,
      status: "pending", // admin approval required
    });

    // 🔹 5. Token
    // const token = generateToken(doctor._id);

    // 🔹 6. Response
    res.status(201).json({
      success: true,
      message: "Doctor registered successfully. Waiting for approval.",
      // token,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        mobile: doctor.mobile,
        specialization: doctor.specialization,
        consultationFee: doctor.consultationFee,
        status: doctor.status,
      },
    });
  } catch (error) {
    console.error("Doctor Register Error:", error);

    // 🔹 Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Mobile or Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
import jwt from "jsonwebtoken";


export const loginDoctorController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 🔹 2. Check Doctor Exists
    const doctor = await Doctor.findOne({ email }).select("+password");

    if (!doctor) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 🔹 3. Compare Password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 🔹 4. Generate JWT Token
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 5. Save Token in Cookie
    res.cookie("doctorToken", token, {
      httpOnly: true, // JS se access nahi hoga (secure 🔥)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 🔹 6. Send Response
    res.status(200).json({
      message: "Doctor login successful",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
      },
    });

  } catch (error) {
    console.error("Doctor Login Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const logoutDoctorController = (req, res) => {
  res.cookie("doctorToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Doctor logged out successfully",
  });
};