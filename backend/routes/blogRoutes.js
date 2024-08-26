const express = require("express");
const { blogValidationRules } = require("../validators/blogValidator");
const validate = require("../middlewares/validate"); // Import the generic validate middleware
const auth = require("../middlewares/authMiddleware");
const {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require("../controllers/blogController");

const router = express.Router();

// Route to get all blogs
router
  .route("/")
  .get(getAllBlogs)
  .post(auth, blogValidationRules(), validate, createBlog);

router.route("/get-user-blogs").get(auth, getUserBlogs);

// Routes for specific blog operations
router
  .route("/:id")
  .get(getSingleBlog)
  .patch(auth, blogValidationRules(), validate, updateBlog)
  .delete(auth, deleteBlog);

module.exports = router;
