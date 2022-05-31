const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  searchProducts,
  deleteProduct,
  promotionProducts,
} = require("../controllers/products.controller");

router.get("/products", getProducts);
router.get("/products/promotion", promotionProducts);
router.post("/products/search", searchProducts);
router.get("/products/:id", getProduct);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
