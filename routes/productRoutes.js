const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictTo");
const validate = require("../middleware/validate");
const {
    createProductSchema,
    updateProductSchema
} = require("../validators/productValidators");
const {
    getAllProducts, getProduct, createProduct, updateProduct, deleteProduct
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", protect, validate(createProductSchema), createProduct);
router.put("/:id", protect, validate(updateProductSchema), updateProduct);
router.delete("/:id", protect, restrictTo("admin"), deleteProduct);

module.exports = router;