const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/products.js");
router.get("/query", searchProduct);
router.get("/:id", findProduct);
router.get("/", getProducts);
router.post("/", addProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

module.exports = router;
