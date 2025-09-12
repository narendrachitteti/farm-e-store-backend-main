const express = require("express");
const router = express.Router();
const counterContoller = require("../controllers/CounterController");
const multer = require("multer");
const upload = multer();

router.post("/add-counter", upload.none(), counterContoller.createCrop);
router.get("/get-counters", counterContoller.getAllCrops);
router.get("/get-id-counter/:id", counterContoller.getByIdCrops);
router.put("/update-counter/:id", upload.none(), counterContoller.updateCrop);
router.delete("/delete-counter/:id", counterContoller.deleteCrop);

module.exports = router;
