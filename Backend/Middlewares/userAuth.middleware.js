import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Get token from cookies
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded contains:
    // { id, role }

    // 3. Find user
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // 4. Block deleted users
    // if (user.isDeleted) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Account deleted",
    //   });
    // }

    // 5. Block banned users
    // if (user.isBlocked) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Account blocked",
    //   });
    // }

    // 6. Check password change (VERY IMPORTANT)
    // if (user.isPasswordChangedAfter(decoded.iat)) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Session expired. Please login again.",
    //   });
    // }

    //  Attach user to request
    req.user = {
      _id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protect;
