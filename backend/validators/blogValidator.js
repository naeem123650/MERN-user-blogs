const { check } = require("express-validator");

const blogValidationRules = () => {
  return [
    check("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),
    check("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 20 })
      .withMessage("Content must be at least 20 characters long"),
  ];
};

module.exports = {
  blogValidationRules,
};
