const Product = require("../models/ProductModel");
const {
  uploadFileToS3,
  deleteFileFromS3,
} = require("../service/aws-s3-service");

exports.createProduct = async (req, res) => {
  try {
    const {
      super_cat_id,
      title,
      sub_title,
      description,
      chemical_content,
      features_benefits,
      modes_of_use,
      method_of_application,
      recommendations,
      category_id,
      sub_category_id,
      brand_id,
      crop_id,
      mfg_by,
      package_qty,
      retailer_package_qty,
      agent_commission
    } = req.body;

    const files = req.files;
    if (!files || files.length !== 3 || !title || !sub_title || !description || !super_cat_id) {
      return res.status(400).json({ message: "All fields and exactly 3 images are required" });
    }

    // Upload all images to S3
    const images = await Promise.all(
      files.map(async (file) => {
        const s3Response = await uploadFileToS3(file);
        return {
          fileName: file.originalname,
          imageUrl: s3Response.url,
          imagePublicId: s3Response.key,
        };
      })
    );

    const parsedPackageQty =
      typeof package_qty === "string" ? JSON.parse(package_qty) : package_qty;

    const parsedRetailerPackageQty =
      typeof retailer_package_qty === "string" ? JSON.parse(retailer_package_qty) : retailer_package_qty;

    const product = new Product({
      images,
      super_cat_id: super_cat_id,
      title,
      sub_title,
      description,
      chemical_content,
      features_benefits,
      modes_of_use,
      method_of_application,
      recommendations,
      category_id,
      sub_category_id,
      brand_id,
      crop_id,
      mfg_by,
      package_qty: parsedPackageQty,
      retailer_package_qty: parsedRetailerPackageQty,
      agent_commission
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub products" });
  }
};

exports.getByIdProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      super_cat_id,
      title,
      sub_title,
      description,
      chemical_content,
      features_benefits,
      modes_of_use,
      method_of_application,
      recommendations,
      category_id,
      sub_category_id,
      brand_id,
      crop_id,
      mfg_by,
      package_qty,
      retailer_package_qty,
      agent_commission
    } = req.body;

    const files = req.files;
    const updateData = {
      super_cat_id,
      title,
      sub_title,
      description,
      chemical_content,
      features_benefits,
      modes_of_use,
      method_of_application,
      recommendations,
      category_id,
      sub_category_id,
      brand_id,
      crop_id,
      mfg_by,
      agent_commission
    };

    if (package_qty) {
      updateData.package_qty =
        typeof package_qty === "string" ? JSON.parse(package_qty) : package_qty;
    }
    if (retailer_package_qty) {
      updateData.retailer_package_qty =
        typeof retailer_package_qty === "string" ? JSON.parse(retailer_package_qty) : retailer_package_qty;
    }
    if (files && files.length === 3) {
      // Optionally, you may want to delete old images from S3 here
      updateData.images = await Promise.all(
        files.map(async (file) => {
          const s3Response = await uploadFileToS3(file);
          return {
            fileName: file.originalname,
            imageUrl: s3Response.url,
            imagePublicId: s3Response.key,
          };
        })
      );
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.imagePublicId) {
      await deleteFileFromS3(product.imagePublicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
