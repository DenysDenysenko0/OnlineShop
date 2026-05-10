const Joi = require("joi");

exports.createProductSchema = Joi.object({
    name: Joi.string().trim().min(2).max(150).required().messages({
        "string.empty": "Product name is required",
        "string.min": "Product name must be at least 2 characters long",
        "any.required": "Product name is required"
    }),
    description: Joi.string().trim().min(5).required().messages({
        "string.empty": "Description is required",
        "string.min": "Description must be at least 5 characters long",
        "any.required": "Description is required"
    }),
    price: Joi.number().min(0).required().messages({
        "number.min": "Price cannot be negative",
        "any.required": "Price is required"
    }),
    category: Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "Category is required",
        "string.min": "Category must be at least 2 characters long",
        "any.required": "Category is required"
    }),
    stock: Joi.number().integer().min(0).required().messages({
        "number.base": "Stock must be a number",
        "number.integer": "Stock must be an integer",
        "number.min": "Stock cannot be negative",
        "any.required": "Stock is required"
    })
});

exports.updateProductSchema = Joi.object({
    name: Joi.string().trim().min(2).max(150),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0),
    category: Joi.string().trim().min(2).max(100),
    stock: Joi.number().integer().min(0)
}).min(1).messages({
    "object.min": "At least one field must be provided for update"
});