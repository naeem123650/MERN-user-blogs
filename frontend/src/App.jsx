import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Sorry from "./components/Sorry";
import Register from "./components/Register";
import BlogList from "./components/BlogList";
import MyBlogs from "./components/MyBlogs";
import WithAuth from "./hoc/WithAuth";
import WithGuest from "./hoc/WithGuest";

const ProtectedMyBlogs = WithAuth(MyBlogs);
const GuestLogin = WithGuest(Login);
const GuestRegister = WithGuest(Register);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<GuestLogin />} />
          <Route path="/register" element={<GuestRegister />} />
          <Route path="/all-blogs" element={<BlogList />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/your-blogs" element={<ProtectedMyBlogs />} />
          <Route path="*" element={<Sorry />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
