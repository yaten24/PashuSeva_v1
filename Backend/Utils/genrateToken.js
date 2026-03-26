import jwt from "jsonwebtoken";

const generateToken = (id) => {
  try {
    if (!id) {
      throw new Error("User ID is required to generate token");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return token;
  } catch (error) {
    console.error("JWT Generation Error:", error.message);
    throw error;
  }
};

export default generateToken;