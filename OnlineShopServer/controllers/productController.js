const catchAsync = require("../utils/catchAsync");
const productService = require("../services/productService");

exports.getAllProducts = catchAsync(async (req, res) => {
    const result = await productService.getAllProducts(req.query);

    res.status(200).json({
        success: true,
        count: result.products.length,
        pagination: result.pagination,
        data: result.products
    });
});

exports.getProduct = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    res.status(200).json({
        success: true,
        data: product
    });
});

exports.createProduct = catchAsync(async (req, res) => {
    const product = await productService.createProduct(req.body, req.user._id);

    res.status(201).json({
        success: true,
        data: product
    });
});

exports.updateProduct = catchAsync(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body, req.user);

    res.status(200).json({
        success: true,
        data: product
    });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    await productService.deleteProduct(req.params.id);

    res.status(200).json({
        success: true,
        message: "Товар видалено"
    });
});