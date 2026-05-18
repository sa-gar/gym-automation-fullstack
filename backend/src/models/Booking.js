import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Member is required"],
    },

    classSchedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassSchedule",
      required: [true, "Class schedule is required"],
    },

    status: {
      type: String,
      enum: ["booked", "cancelled", "completed", "no_show"],
      default: "booked",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index(
  {
    member: 1,
    classSchedule: 1,
  },
  {
    unique: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;