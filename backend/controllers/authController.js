const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/AsyncHandler");

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ message: "User registered successfully", data: user });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new AppError("Invalid credentials", 400));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 400));
  }

  const token = await user.generateAuthToken();

  res.status(200).json({
    success: true,
    data: {
      username: user.username,
      email: user.email,
      token,
    },
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

exports.getAuthUser = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true, data: req.user });
});
