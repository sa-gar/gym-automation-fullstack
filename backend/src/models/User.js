import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const membershipSchema = new mongoose.Schema(
  {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "expired", "paused", "cancelled", "none"],
      default: "none",
    },
    autoRenewal: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["member", "admin", "trainer", "staff"],
      default: "member",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },

    age: {
      type: Number,
      default: null,
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

    emergencyContactName: {
      type: String,
      default: "",
    },

    emergencyContactPhone: {
      type: String,
      default: "",
    },

    medicalConditions: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    membership: {
      type: membershipSchema,
      default: () => ({}),
    },

    qrCode: {
      type: String,
      default: "",
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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", function () {
  if (!this.memberId && this.role === "member") {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    this.memberId = `GYM-${randomNumber}`;
  }
});

const User = mongoose.model("User", userSchema);

export default User;