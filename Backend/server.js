import dns from "node:dns";
// 🔥 Fix MongoDB Atlas DNS issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser"

import connectDB from "./Config/db.js";
import userRoutes from "./Routes/user.routes.js"
import sellerRoutes from "./Routes/seller.routes.js"
import doctorRoutes from "./Routes/doctor.routes.js"
// ==============================
// LOAD ENV
// ==============================
dotenv.config();

// ==============================
// INIT APP
// ==============================
const app = express();

// ==============================
// GLOBAL MIDDLEWARES
// ==============================

// Security headers
app.use(helmet());

// Enable CORS (customize in production)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://apnapashu.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps / postman

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ==============================
// ROUTES
// ==============================
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/doctor", doctorRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 PashuSeva API Running",
  });
});

// ==============================
// 404 HANDLER
// ==============================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==============================
// GLOBAL ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// SERVER START
// ==============================

// const startServer = async () => {
//   try {
//     await connectDB(); // ✅ wait for DB

//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`🔥 Server running on port ${process.env.PORT || 5000}`);
//     });
//   } catch (error) {
//     console.error("❌ Failed to start server:", error.message);
//     process.exit(1);
//   }
// };

// startServer();

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
  });
});

// ==============================
// HANDLE UNHANDLED PROMISE REJECTIONS
// ==============================
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

// ==============================
// HANDLE UNCAUGHT EXCEPTIONS
// ==============================
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});