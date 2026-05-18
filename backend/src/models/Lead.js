import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    fitnessGoal: {
      type: String,
      enum: [
        "weight_loss",
        "muscle_gain",
        "general_fitness",
        "strength",
        "flexibility",
        "other",
        "",
      ],
      default: "",
    },

    source: {
      type: String,
      enum: ["website", "whatsapp", "walk_in", "instagram", "facebook", "referral", "other"],
      default: "website",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "trial_booked", "converted", "lost"],
      default: "new",
    },

    trialDate: {
      type: Date,
      default: null,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    convertedMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;