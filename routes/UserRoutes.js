const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const auth = require("../middlewares/Auth");

router.post("/login", userController.loginUser);

router.post("/add-user", userController.createUser);
router.get("/get-user", auth, userController.getAllUsers);
router.get("/get-user-by-id/:id", auth, userController.getUserById);
router.put("/update-user/:id", auth, userController.updateUser);
router.delete("/delete-user/:id", auth, userController.deleteUser);

module.exports = router;
