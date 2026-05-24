const Joi = require("joi");

exports.createReviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
        "number.base": "Rating must be a number",
        "number.min": "Оцінка не може бути менше 1",
        "number.max": "Оцінка не може бути більше 5",
        "any.required": "Оцінка обов'язкова"
    }),
    comment: Joi.string().trim().min(10).max(500).required().messages({
        "string.empty": "Текст відгуку обов'язковий",
        "string.min": "Відгук має містити мінімум 10 символів",
        "string.max": "Відгук має містити максимум 500 символів",
        "any.required": "Текст відгуку обов'язковий"
    })
});