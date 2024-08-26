import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-lg font-bold">
            BlogApp
          </Link>
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/your-blogs" className="mr-4">
                Your Blogs
              </Link>
              <Link to="/blogs" className="mr-4">
                All Blogs
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register" className="mr-4">
                Register
              </Link>
              <Link to="/blogs" className="mr-4">
                All Blogs
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
