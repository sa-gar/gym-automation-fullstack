import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: [true, "Plan price is required"],
    },

    durationInDays: {
      type: Number,
      required: [true, "Plan duration is required"],
    },

    planType: {
      type: String,
      enum: ["basic", "standard", "premium", "personal_training", "custom"],
      default: "basic",
    },

    features: {
      type: [String],
      default: [],
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;