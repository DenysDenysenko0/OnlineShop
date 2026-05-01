const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictTo");
const {
    getAllProducts, getProduct, createProduct, updateProduct, deleteProduct
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, restrictTo("admin"), deleteProduct);

module.exports = router;