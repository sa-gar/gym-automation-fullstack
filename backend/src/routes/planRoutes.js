import express from "express";

import {
  createPlan,
  getActivePlans,
  getAllPlans,
  getSinglePlan,
  updatePlan,
  deactivatePlan,
  activatePlan,
} from "../controllers/planController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route: website can show active plans
router.get("/", getActivePlans);

// Admin routes
router.get("/all", protect, authorize("admin", "staff"), getAllPlans);
router.post("/", protect, authorize("admin"), createPlan);

router.get("/:id", getSinglePlan);
router.put("/:id", protect, authorize("admin"), updatePlan);
router.patch("/:id/deactivate", protect, authorize("admin"), deactivatePlan);
router.patch("/:id/activate", protect, authorize("admin"), activatePlan);

export default router;