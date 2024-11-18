const Joi = require("joi");

const validateSignupSchema = Joi.object({
  firstName: Joi.string().trim().min(1).required().messages({
    "any.required": "First name is required.",
    "string.min": "First name cannot be empty.",
  }),
  lastName: Joi.string().allow("").optional(),
  email: Joi.string().email().required().messages({
    "any.required": "Email id is required.",
    "string.email": "Please enter a valid email id.",
  }),
  gender: Joi.string().valid("Female", "Male", "Others").optional().messages({
    "any.only": "Gender must be one of the following: Female, Male, or Others.",
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number, and one special character.",
    }),
});

const validateLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email id is required.",
    "string.email": "Please enter a valid email id.",
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number, and one special character.",
    }),
});

const validateBudgetSchema = Joi.object({
  categoryId: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
    .messages({
      "any.required": "Category ID is required.",
      "string.pattern.base": "Invalid Category ID format.",
    }),

  amount: Joi.number().positive().required().messages({
    "any.required": "Budget amount is required.",
    "number.base": "Budget amount must be a valid number.",
    "number.positive": "Budget amount must be a positive number.",
  }),
});

const validateExpenseSchema = Joi.object({
  categoryId: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
    .messages({
      "any.required": "Category ID is required.",
      "string.pattern.base": "Invalid Category ID format.",
    }),
  title: Joi.string().required().min(5).messages({
    "any.required": "Title is required.",
    "string.min": "Title should have atleast 5 characters",
  }),
  description: Joi.string().required().min(5).messages({
    "any.required": "Description is required.",
    "string.min": "Description should have atleast 5 characters",
  }),
  amount: Joi.number().positive().required().messages({
    "any.required": "Budget amount is required.",
    "number.base": "Budget amount must be a valid number.",
    "number.positive": "Budget amount must be a positive number.",
  }),
});

module.exports = {
  validateSignupSchema,
  validateLoginSchema,
  validateBudgetSchema,
  validateExpenseSchema,
};
