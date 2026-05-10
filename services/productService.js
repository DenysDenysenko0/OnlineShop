const Product = require("../models/Product");
const AppError = require("../utils/AppError");

exports.getAllProducts = async (query = {}) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (query.category) {
        filter.category = query.category;
    }

    const [products, total] = await Promise.all([
        Product.find(filter)
            .populate("createdBy", "name email")
            .skip(skip)
            .limit(limit),
        Product.countDocuments(filter)
    ]);

    return {
        products,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    };
};

exports.getProductById = async (id) => {
    const product = await Product.findById(id).populate("createdBy", "name email");

    if (!product) {
        throw new AppError("Товар не знайдено", 404);
    }

    return product;
};

exports.createProduct = async (data, userId) => {
    const product = await Product.create({
        ...data,
        createdBy: userId
    });

    return product;
};

exports.updateProduct = async (id, data, currentUser) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new AppError("Товар не знайдено", 404);
    }

    if (
        product.createdBy.toString() !== currentUser._id.toString() &&
        currentUser.role !== "admin"
    ) {
        throw new AppError("Ви не маєте прав редагувати цей запис", 403);
    }

    Object.assign(product, data);
    await product.save();

    return product;
};

exports.deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        throw new AppError("Товар не знайдено", 404);
    }

    return product;
};