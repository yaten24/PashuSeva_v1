import jwt from "jsonwebtoken";
import Seller from "../Models/seller.model.js";

export const protectSeller = async (req, res, next) => {
  try {
    let token;

    // 🔥 Token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 🔥 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Get seller
    const seller = await Seller.findById(decoded.id).select("-password");

    if (!seller) {
      return res.status(401).json({
        message: "Seller not found",
      });
    }

    // 🔥 Attach to req
    req.user = seller;

    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};