const Blog = require("../models/Blog");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/AsyncHandler");

const getAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find().populate("author", "username email");
  res.json({
    success: true,
    data: blogs,
  });
});

const getUserBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find({ author: req.user.userId });
  res.json({
    success: true,
    data: blogs,
  });
});

const getSingleBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  res.json({
    success: true,
    data: blog,
  });
});

// Create a new blog
const createBlog = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content, author: req.user.userId });
  await newBlog.save();

  res.status(201).json({
    success: true,
    data: newBlog,
  });
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Find the blog by ID
  const blog = await Blog.findById(id);

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  if (blog.author.toString() !== req.user.userId) {
    return next(
      new AppError("You are not authorized to update this blog", 403)
    );
  }

  const updateBlog = await Blog.findByIdAndUpdate(
    id,
    { title, content },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateBlog) {
    return next(new AppError("Blog not found", 404));
  }

  res.json({
    success: true,
    data: updateBlog,
  });
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Find the blog by ID
  const blog = await Blog.findById(id);

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  // Check if the user is the author of the blog
  if (blog.author.toString() !== req.user.userId) {
    return next(
      new AppError("You are not authorized to delete this blog", 403)
    );
  }

  const blogDel = await Blog.findByIdAndDelete(id);

  if (!blogDel) {
    return next(new AppError("Blog not found", 404));
  }

  res.status(204).json({
    success: true,
    data: null,
    message: "Blog successfully deleted",
  });
});

module.exports = {
  getAllBlogs,
  getSingleBlog,
  getUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
