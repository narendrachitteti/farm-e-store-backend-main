const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/SubCategoryController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/add-sub-category",
  upload.single("file"),
  subcategoryController.createSubCategory
);
router.get("/get-sub-category", subcategoryController.getAllSubCategories);
router.get(
  "/get-id-sub-category/:id",
  subcategoryController.getByIdSubCategories
);
router.put(
  "/update-sub-category/:id",
  upload.single("file"),
  subcategoryController.updateSubCategory
);
router.delete(
  "/delete-sub-category/:id",
  subcategoryController.deleteSubCategory
);

module.exports = router;
