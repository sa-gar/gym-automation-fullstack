import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Member is required"],
    },

    checkInTime: {
      type: Date,
      default: Date.now,
    },

    checkOutTime: {
      type: Date,
      default: null,
    },

    checkInMethod: {
      type: String,
      enum: ["qr", "biometric", "rfid", "manual"],
      default: "manual",
    },

    status: {
      type: String,
      enum: ["checked_in", "checked_out"],
      default: "checked_in",
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;