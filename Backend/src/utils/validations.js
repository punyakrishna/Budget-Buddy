const {
  validateSignupSchema,
  validateLoginSchema,
  validateBudgetSchema,
  validateExpenseSchema,
} = require("../utils/validationSchema");

const loginValidation = (req, res, next) => {
  const { error } = validateLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      code: 400,
      error: error.details.map((detail) => detail.message),
    });
  }
  next();
};

const signUpDataValidation = (req, res, next) => {
  const { error } = validateSignupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      code: 400,
      error: error.details.map((detail) => detail.message),
    });
  }
  next();
};

const validateBudgetData = (req, res, next) => {
  const { error } = validateBudgetSchema.validate(req.body);
  if (error) {
    const message = error.details[0].message;

    return res.status(400).json({
      code: 400,
      error: message,
    });
  }
  next();
};

const validateExpenseData = (req, res, next) => {
  const { error } = validateExpenseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      code: 400,
      error: error.details.map((detail) => detail.message),
    });
  }
  next();
};

module.exports = {
  signUpDataValidation,
  loginValidation,
  validateBudgetData,
  validateExpenseData,
};
