const mongoose = require("mongoose");

const SuperCategorySchema = new mongoose.Schema(
    {
        fileName: { type: String, required: true },
        imageUrl: { type: String, required: true },
        imagePublicId: { type: String, required: true },
        title: { type: String, required: true },
        sub_title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SuperCategory", SuperCategorySchema);
