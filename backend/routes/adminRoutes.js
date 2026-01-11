import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/stats", async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const confirmedOrders = await Order.countDocuments({
      status: "Confirmed",
    });

    const sales = await Order.aggregate([
      { $match: { status: "Confirmed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const lowStock = await Product.find({ stock: { $lt: 5 } });

    res.json({
      productsCount,
      ordersCount,
      pendingOrders,
      confirmedOrders,
      totalSales: sales[0]?.total || 0,
      lowStock,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

export default router;
