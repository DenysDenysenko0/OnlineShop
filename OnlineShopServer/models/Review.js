const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, "Оцінка обов'язкова"],
        min: [1, "Оцінка не може бути менше 1"],
        max: [5, "Оцінка не може бути більше 5"]
    },
    comment: {
        type: String,
        required: [true, "Текст відгуку обов'язковий"],
        trim: true,
        minlength: [10, "Відгук має містити мінімум 10 символів"],
        maxlength: [500, "Відгук має містити максимум 500 символів"]
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);