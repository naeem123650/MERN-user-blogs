// components/MyBlogs.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogs } from "../redux/actions/blogActions";

const MyBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.userBlogs);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
      {error && <p className="text-red-500">{error}</p>}
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="mb-4">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p>{blog.content}</p>
              {/* Add buttons for editing and deleting the blog */}
              <button className="text-blue-500">Edit</button>
              <button className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBlogs;
