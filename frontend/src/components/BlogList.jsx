import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/actions/blogActions";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  console.log(blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-md p-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
