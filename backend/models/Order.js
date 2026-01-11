import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    payment: {
      type: String,
      enum: ["Cash on Delivery", "JazzCash", "Bank Transfer"],
      required: true,
    },

    paymentProof: {
      type: String,
      default: null,
    },

    items: {
      type: Array,
      required: true,
    },

    deliveryCharges: {
      type: Number,
      default: 200,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // Order lifecycle
    status: {
      type: String,
      enum: ["pending", "Pending", "approved", "Approved", "in progress", "In Progress", "delivered", "Delivered", "rejected", "Rejected", "Confirmed"],
      default: "Pending",
    },

    // Payment verification
    paymentStatus: {
      type: String,
      enum: ["Unverified", "Verified", "Rejected", "Pending"],
      default: "Unverified",
    },

    // Admin response/note
    adminResponse: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
