import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  stock: { type: Number, default: 0 },
  sale: {
    isOnSale: { type: Boolean, default: false },
    discountPercentage: { type: Number, default: 0 },
    saleStartDate: { type: Date, default: null },
    saleEndDate: { type: Date, default: null }
  }
}, {
  timestamps: true
});

export default mongoose.model("Product", productSchema);
