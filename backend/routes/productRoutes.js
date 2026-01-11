import express from "express";
import multer from "multer";
import { addProduct, getProducts, deleteProduct, updateProduct, setSaleOnProduct, removeSaleFromProduct, getProductsOnSale } from "../controllers/productController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("image"), addProduct);
router.get("/", getProducts);
router.get("/sale", getProductsOnSale);
router.put("/sale/:id", setSaleOnProduct);
router.delete("/sale/:id", removeSaleFromProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
