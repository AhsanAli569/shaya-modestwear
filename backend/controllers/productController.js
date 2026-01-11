import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;
    const image = req.file ? req.file.filename : "";

    const product = new Product({
      name,
      category,
      price,
      description,
      stock,
      image
    });

    await product.save();
    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

export const updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
};

// Set sale on product
export const setSaleOnProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { isOnSale, discountPercentage, saleStartDate, saleEndDate } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.sale = {
      isOnSale: isOnSale || false,
      discountPercentage: discountPercentage || 0,
      saleStartDate: saleStartDate || null,
      saleEndDate: saleEndDate || null
    };

    await product.save();
    res.json({ success: true, message: "Sale updated successfully", product });

  } catch (error) {
    console.error("Error setting sale:", error);
    res.status(500).json({ success: false, message: "Failed to update sale" });
  }
};

// Remove sale from product
export const removeSaleFromProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.sale = {
      isOnSale: false,
      discountPercentage: 0,
      saleStartDate: null,
      saleEndDate: null
    };

    await product.save();
    res.json({ success: true, message: "Sale removed successfully", product });

  } catch (error) {
    console.error("Error removing sale:", error);
    res.status(500).json({ success: false, message: "Failed to remove sale" });
  }
};

// Get products on sale
export const getProductsOnSale = async (req, res) => {
  try {
    const currentDate = new Date();
    const products = await Product.find({
      "sale.isOnSale": true,
      $or: [
        { "sale.saleEndDate": null },
        { "sale.saleEndDate": { $gte: currentDate } }
      ]
    });
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching sale products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch sale products" });
  }
};

