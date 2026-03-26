import Seller from "../Models/seller.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Register Seller Controller
export const registerSellerController = async (req, res) => {
  try {
    const { name, email, password, mobile, city, state } = req.body;

    // 🔸 Basic Validation
    if (!name || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Mobile and Password are required",
      });
    }

    // 🔸 Email Validation (optional but recommended)
    if (email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }
    }

    // 🔸 Password Length Check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // 🔸 Check Existing Seller
    const existingSeller = await Seller.findOne({
      $or: [{ mobile }, ...(email ? [{ email }] : [])],
    });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller already exists with this mobile or email",
      });
    }

    // 🔸 Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔸 Create Seller
    const seller = await Seller.create({
      name: name.trim(),
      email: email?.toLowerCase().trim(),
      mobile: mobile.trim(),
      password: hashedPassword,
      location: {
        city: city || "",
        state: state || "",
      },
    });

    // 🔸 Response (without password)
    return res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        mobile: seller.mobile,
        role: seller.role,
        status: seller.status,
      },
    });
  } catch (error) {
    console.error("Seller Registration Error:", error);

    // 🔸 Mongo Duplicate Key Error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value (mobile/email already exists)",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const loginSellerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 🔹 Check seller
    const seller = await Seller.findOne({ email }).select("+password");

    if (!seller) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 🔹 Generate Token
    const token = jwt.sign(
      { id: seller._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 Save in Cookies
    res.cookie("sellerToken", token, {
      httpOnly: true, // JS access blocked (security 🔥)
      secure: process.env.NODE_ENV === "production", // https only in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 🔹 Response
    res.status(200).json({
      message: "Login successful",
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};