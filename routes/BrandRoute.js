const express = require("express");
const router = express.Router();
const brandContoller = require("../controllers/BrandController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/add-brand", upload.single("file"), brandContoller.createBrand);
router.get("/get-brand", brandContoller.getAllBrands);
router.get("/get-id-brand/:id", brandContoller.getByIdBrands);
router.put(
  "/update-brand/:id",
  upload.single("file"),
  brandContoller.updateBrand
);
router.delete("/delete-brand/:id", brandContoller.deleteBrand);

module.exports = router;
