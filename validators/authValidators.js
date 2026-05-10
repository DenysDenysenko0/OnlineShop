const Joi = require("joi");

exports.registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters long",
        "any.required": "Name is required"
    }),
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters long",
        "string.empty": "Password is required",
        "any.required": "Password is required"
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirmation password is not the same as entered password",
        "string.empty": "Confirm password is required",
        "any.required": "Confirm password is required"
    })
});

exports.loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required"
    })
});