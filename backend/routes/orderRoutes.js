import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import multer from "multer";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/payments",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Test route
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Order routes working!" });
});

// Test PUT route
router.put("/testput", (req, res) => {
  res.json({ success: true, message: "PUT route working!", body: req.body });
});

// Get all orders (Admin)
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's own orders (requires authentication)
router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

// Update order status (Admin)
router.put("/status/:id", async (req, res) => {
  try {
    console.log("📜pdate order status:", req.params.id, req.body);
    
    const { status, adminResponse } = req.body;
    const updateData = { status };
    if (adminResponse) {
      updateData.adminResponse = adminResponse;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
});

// Verify payment
router.put("/verify-payment/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { paymentStatus: "Verified" });
    res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});

// Reject payment
router.put("/reject-payment/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { paymentStatus: "Rejected" });
    res.json({ success: true, message: "Payment rejected" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Rejection failed" });
  }
});

// Place order (requires authentication)
router.post("/place", verifyToken, upload.single("paymentProof"), async (req, res) => {
  try {
    const { name, mobile, address, payment } = req.body;
    const userId = req.userId;

    if (!userId || !name || !mobile || !address || !payment) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let items = [];
    try {
      items = JSON.parse(req.body.items);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid items data" });
    }

    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });

    const deliveryCharges = 200;
    const grandTotal = total + deliveryCharges;

    // Reduce stock
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    const paymentProof = req.file ? req.file.filename : null;

    const newOrder = new Order({
      userId,
      name,
      mobile,
      address,
      payment,
      items,
      deliveryCharges,
      totalAmount: grandTotal,
      paymentProof,
      paymentStatus: payment === "Cash on Delivery" ? "Verified" : "Unverified",
      status: "Pending",
    });

    await newOrder.save();
    res.json({ success: true, message: "Order placed successfully", newOrder });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

console.log("✅ Order routes loaded successfully");

export default router;
