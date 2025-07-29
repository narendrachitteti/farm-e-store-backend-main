const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const userRoutes = require("./routes/UserRoutes");
const config = require("./config/db");
const categoryRoute = require("./routes/CategoryRoute");
const subCategoryRoute = require("./routes/SubCategoryRoute");
const brandRoute = require("./routes/BrandRoute");
const cropRoute = require("./routes/CropRoute");
const productRoute = require("./routes/ProductRoute");
const adminRoute = require("./routes/AdminRoute");
const orderRoute = require("./routes/OrderRoute");
const superCatRoute = require("./routes/SuperCatRoute");
const pestRoute = require("./routes/PestRoute");
const entrepreneurRoute = require("./routes/EntrepreneurRoute");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoutes);
app.use("/api/super-category", superCatRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subCategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/crop", cropRoute);
app.use("/api/product", productRoute);
app.use("/api/admin", adminRoute);
app.use("/api/order", orderRoute)
app.use("/api/pest", pestRoute);
app.use("/api/entrepreneur", entrepreneurRoute);

const razorpay = new Razorpay({
  key_id: "rzp_test_lAupy84di3wKt5",
  key_secret: "XCuLGKyiZ9LWx9qosQ7xQ5e3",
});

app.post("/api/razorpay/create-razorpay-order", async (req, res) => {
  const { amount, currency } = req.body;

  const generateReceiptNumber = () => {
    const prefix = "receipt_";
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${Date.now()}_${randomDigits}`;
  };
  const receipt = generateReceiptNumber();
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/razorpay/verify-razorpay-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generatedSignature = crypto
    .createHmac("sha256", "XCuLGKyiZ9LWx9qosQ7xQ5e3")
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
});

const port = config.port || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
