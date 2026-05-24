const Review = require("../models/Review");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

exports.getReviewsByProduct = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Товар не знайдено", 404);
    }

    const reviews = await Review.find({ product: productId })
        .populate("user", "name email");

    return reviews;
};

exports.createReview = async (data, productId, userId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Товар не знайдено", 404);
    }

    try {
        const review = await Review.create({
            ...data,
            product: productId,
            user: userId
        });

        return review;
    } catch (error) {
        if (error.code === 11000) {
            throw new AppError("Ви вже залишили відгук на цей товар", 400);
        }

        throw error;
    }
};

exports.deleteReview = async (reviewId, currentUser) => {
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new AppError("Відгук не знайдено", 404);
    }

    if (
        review.user.toString() !== currentUser._id.toString() &&
        currentUser.role !== "admin"
    ) {
        throw new AppError("Ви не маєте прав видалити цей відгук", 403);
    }

    await review.deleteOne();

    return review;
};