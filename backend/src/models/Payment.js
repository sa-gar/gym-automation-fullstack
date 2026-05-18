import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Member is required"],
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: [true, "Plan is required"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card", "net_banking", "razorpay", "other"],
      default: "cash",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    transactionId: {
      type: String,
      default: "",
    },

    invoiceNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    paidAt: {
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

paymentSchema.pre("save", function (next) {
  if (!this.invoiceNumber) {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    this.invoiceNumber = `INV-${randomNumber}`;
  }

  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;