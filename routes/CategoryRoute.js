const express = require("express");
const categoryController = require("../controllers/CategoryController");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/add-category",
  upload.single("file"),
  categoryController.createCategory
);
router.get("/get-category", categoryController.getCategories);
router.get("/get-by-id-category/:id", categoryController.getCategoryById);
router.put(
  "/update-category/:id",
  upload.single("file"),
  categoryController.updateCategory
);
router.delete("/delete-category/:id", categoryController.deleteCategory);

module.exports = router;
