import Seller from "../Models/seller.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Register Seller Controller
export const registerSellerController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      city,
      state,
      businessName, // ✅ NEW
      aadharNumber, // ✅ NEW
    } = req.body;

    // 🔸 1. Basic Validation
    if (!name || !mobile || !password || !businessName || !aadharNumber) {
      return res.status(400).json({
        success: false,
        message: "Name, Mobile, Password, Business Name & Aadhar are required",
      });
    }

    // 🔸 2. Email Validation
    if (email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }
    }

    // 🔸 3. Mobile Validation (India)
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    // 🔸 4. Aadhar Validation (12 digit)
    if (!/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Aadhar number",
      });
    }

    // 🔸 5. Password Length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // 🔸 6. Check Existing Seller
    const existingSeller = await Seller.findOne({
      $or: [{ mobile }, ...(email ? [{ email }] : []), { aadharNumber }],
    });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller already exists with this mobile/email/aadhar",
      });
    }

    // 🔸 7. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔸 8. Create Seller
    const seller = await Seller.create({
      name: name.trim(),
      email: email?.toLowerCase().trim(),
      mobile: mobile.trim(),
      password: hashedPassword,
      businessName: businessName.trim(),
      aadharNumber: aadharNumber.trim(),
      location: {
        city: city || "",
        state: state || "",
      },
      status: "pending", // 🔥 approval system
    });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 🔥 Save in Cookies
    res.cookie("sellerToken", token, {
      httpOnly: true, // JS access blocked (security 🔥)
      secure: process.env.NODE_ENV === "production", // https only in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 🔸 9. Response
    return res.status(201).json({
      success: true,
      message: "Seller registered successfully. Waiting for approval.",
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        mobile: seller.mobile,
        businessName: seller.businessName,
        city: seller.location?.city,
        state: seller.location?.state,
        status: seller.status,
      },
    });
  } catch (error) {
    console.error("Seller Registration Error:", error);

    // 🔸 Mongo Duplicate Key Error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value (mobile/email/aadhar already exists)",
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
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 🔥 Save in Cookies
    // res.cookie("sellerToken", token, {
    //   httpOnly: true, // JS access blocked (security 🔥)
    //   secure: process.env.NODE_ENV === "production", // https only in prod
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

export const getSellerProfile = async (req, res) => {
  try {
    const sellerId = req.user.id; // middleware se aayega

    const seller = await Seller.findById(sellerId).select("-password"); // 🔥 password hide

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Get Seller Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const logoutSeller = (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Seller logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
