const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/add-product",
  upload.array("images", 3),
  productController.createProduct
);
router.get("/get-product", productController.getAllProduct);
router.get("/get-id-product/:id", productController.getByIdProduct);
router.put(
  "/update-product/:id",
  upload.array("images", 3),
  productController.updateProduct
);
router.delete("/delete-product/:id", productController.deleteProduct);

module.exports = router;
