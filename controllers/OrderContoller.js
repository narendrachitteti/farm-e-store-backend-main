const Order = require("../models/OrderModel");

exports.createOrder = async (req, res) => {
  try {
    const {
      name,
      user_id,
      date,
      razorpay_payment_status,
      transaction_id,
      products,
      order_status,
      address,
      phone,
      pincode,
      total_amount,
      status,
    } = req.body;
    const order = new Order({
      name,
      user_id,
      date,
      razorpay_payment_status,
      transaction_id,
      products,
      order_status,
      address,
      phone,
      pincode,
      total_amount,
      status,
    });
    await order.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order Not Found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const {
      name,
      user_id,
      date,
      razorpay_payment_status,
      transaction_id,
      products,
      order_status,
      address,
      phone,
      pincode,
      total_amount,
      status,
    } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        name,
        user_id,
        date,
        razorpay_payment_status,
        transaction_id,
        products,
        order_status,
        address,
        phone,
        pincode,
        total_amount,
        status,
      },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not Found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not Found" });
    res.status(200).json({ message: "Order Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
