const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    images: [
      {
        fileName: { type: String, required: true },
        imageUrl: { type: String, required: true },
        imagePublicId: { type: String, required: true },
      }
    ],
    super_cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperCategory",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategories",
      required: true,
    },
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    crop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      required: true,
    },
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    description: { type: String, required: true },
    chemical_content: { type: String },
    features_benefits: { type: String },
    modes_of_use: { type: String },
    method_of_application: { type: String },
    recommendations: { type: String },
    mfg_by: { type: String },
    agent_commission: { type: String },
    package_qty: [
      {
        pkgName: { type: String },
        qty: { type: String },
        mrp_price: { type: String },
        sell_price: { type: String },
        mfg_date: { type: String },
        exp_date: { type: String },
      },
    ],
    retailer_package_qty: [
      {
        pkgName: { type: String },
        qty: { type: String },
        mrp_price: { type: String },
        sell_price: { type: String },
        mfg_date: { type: String },
        exp_date: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
