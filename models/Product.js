const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);