import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const WithGuest = (Component) => {
  return (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
};

export default WithGuest;
