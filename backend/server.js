import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import planRoutes from "./src/routes/planRoutes.js";
import leadRoutes from "./src/routes/leadRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gym Automation Backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/leads", leadRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});