import mongoose from "mongoose";

const classScheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Class title is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "strength",
        "cardio",
        "yoga",
        "zumba",
        "hiit",
        "boxing",
        "crossfit",
        "other",
      ],
      default: "other",
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Trainer is required"],
    },

    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },

    endTime: {
      type: Date,
      required: [true, "End time is required"],
    },

    maxSeats: {
      type: Number,
      required: [true, "Maximum seats are required"],
      default: 20,
    },

    bookedSeats: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
      default: "Main Gym Floor",
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

const ClassSchedule = mongoose.model("ClassSchedule", classScheduleSchema);

export default ClassSchedule;