import express from "express";
import {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
  logoutUser,
} from "../controllers/authController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, getMyProfile);
router.put("/profile", protect, updateMyProfile);
router.post("/logout", protect, logoutUser);

// Test protected routes
router.get("/member-only", protect, authorize("member"), (req, res) => {
  res.json({
    success: true,
    message: "This route is only for members.",
    user: req.user,
  });
});

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "This route is only for admins.",
    user: req.user,
  });
});

router.get(
  "/trainer-only",
  protect,
  authorize("trainer", "admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "This route is only for trainers and admins.",
      user: req.user,
    });
  }
);

export default router;