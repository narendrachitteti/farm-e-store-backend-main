const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderContoller");

router.post("/add-order", orderController.createOrder);
router.get("/get-orders", orderController.getOrders);
router.get("/get-order-by-id/:id", orderController.getOrderById);
router.put("/update-order/:id", orderController.updateOrder);
router.delete("/delete-order/:id", orderController.deleteOrder);

module.exports = router;
