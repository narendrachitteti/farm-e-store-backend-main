const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/admin-register", adminController.registerAdmin);
router.post("/admin-login", adminController.loginAdmin);
router.patch("/admin-update/:id", adminController.updateAdmin);
router.get("/get-admin", adminController.getByIdAdmin);

module.exports = router;
