const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  addCategory,
  deleteCategory,
  editCategory,
  getCategoryByType,
  getCategoryByAscii,
} = require("../controllers/categories.controller");

router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.get("/categories/type/:type", getCategoryByType);
router.get("/categories/ascii/:nameAscii", getCategoryByAscii);
router.post("/categories", addCategory);
router.put("/categories/:id", editCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;
