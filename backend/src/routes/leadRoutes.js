import express from "express";

import {
  createLead,
  bookFreeTrial,
  getAllLeads,
  getSingleLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
} from "../controllers/leadController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", createLead);
router.post("/free-trial", bookFreeTrial);

// Admin/staff routes
router.get("/", protect, authorize("admin", "staff"), getAllLeads);

router.get("/:id", protect, authorize("admin", "staff"), getSingleLead);
router.put("/:id", protect, authorize("admin", "staff"), updateLead);
router.patch(
  "/:id/status",
  protect,
  authorize("admin", "staff"),
  updateLeadStatus
);
router.delete("/:id", protect, authorize("admin"), deleteLead);

export default router;