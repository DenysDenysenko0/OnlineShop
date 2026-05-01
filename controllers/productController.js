const Product = require("../models/Product");
const AppError = require("../utils/AppError");

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("createdBy", "name email");

        if (!product) {
            return next(new AppError("Товар не знайдено", 404));
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create({
            ...req.body,
            createdBy: req.user._id
        });

        return res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return next(new AppError("Товар не знайдено", 404));
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return next(new AppError("Товар не знайдено", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Товар видалено"
        });
    } catch (error) {
        next(error);
    }
};