import User from "../Models/user.model.js"
import bcrypt from "bcryptjs";

// ==============================
// REGISTER USER
// ==============================
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // 🔹 Validation
    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    // 🔹 Check existing user
    let existingUser = await User.findOne({
      $or: [{ mobile }, { email }],
    });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        message: "User already exists with this mobile/email",
      });
    }

    // 🔹 Hash password (optional)
    let hashedPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // 🔹 Create or update user
    let user;

    if (existingUser) {
      // update existing unverified user
      existingUser.name = name || existingUser.name;
      existingUser.email = email || existingUser.email;
      existingUser.password = hashedPassword || existingUser.password;
      existingUser.authProvider = "mobile";

      user = await existingUser.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        mobile,
        authProvider: "mobile",
      });
    }

    // 🔹 Generate token
    // const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      // token,
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);

    // Duplicate key error handle
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate field value (email or mobile already exists)",
      });
    }

    res.status(500).json({
      message: "Server Error",
    });
  }
};

import generateToken from "../utils/genrateToken.js";

export const loginUserController = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    // 🔹 Validation
    if ((!email && !mobile) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or Mobile and Password are required",
      });
    }

    // 🔹 Find user
    const user = await User.findOne({
      $or: [{ email }, { mobile }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔹 Generate Token
    const accessToken = generateToken(user._id);

    // 🔹 Send cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

    // 🔹 Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    user
  });
}

// // Send OTP
// exports.sendOtpController = async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     let user = await User.findOne({ mobile });

//     if (!user) {
//       user = new User({ mobile });
//     }

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     await sendOtp(mobile, otp);

//     res.json({ success: true, message: "OTP sent" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Verify OTP
// exports.verifyOtpController = async (req, res) => {
//   try {
//     const { mobile, otp } = req.body;

//     const user = await User.findOne({ mobile });

//     if (!user || user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     user.isVerified = true;
//     user.otp = null;

//     await user.save();

//     const token = generateToken(user._id);

//     res.json({ success: true, token, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Google Login
// exports.googleLoginController = async (req, res) => {
//   try {
//     const { email, name, googleId } = req.body;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({ email, name, googleId, isVerified: true });
//     }

//     const token = generateToken(user._id);

//     res.json({ success: true, token, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };