const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  // Extract errors and group them by field
  const extractedErrors = errors.array().reduce((acc, err) => {
    // Use the field name (err.param) as the key
    const key = err.path || "unknown";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(err.msg);
    return acc;
  }, {});

  return res.status(422).json({
    success: false,
    errors: extractedErrors,
  });
};

module.exports = validate;
