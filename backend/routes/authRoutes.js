const express = require("express");
const {
  registerValidationRules,
  loginValidationRules,
} = require("../validators/authValidator");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/authMiddleware");
const {
  register,
  login,
  logout,
  getAuthUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerValidationRules(), validate, register);

router.post("/login", loginValidationRules(), validate, login);

router.post("/logout", auth, logout);

router.get("/me", auth, getAuthUser);

module.exports = router;
