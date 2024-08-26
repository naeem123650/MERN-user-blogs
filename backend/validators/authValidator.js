const { check } = require("express-validator");

// Validation rules for registration
const registerValidationRules = () => {
  return [
    check("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ];
};

// Validation rules for login
const loginValidationRules = () => {
  return [
    check("email").isEmail().withMessage("Invalid email address"),
    check("password").notEmpty().withMessage("Password is required"),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
