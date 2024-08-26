import { combineReducers } from "redux";
import authReducer from "./authReducer";
import blogReducer from "./blogReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
});

export default rootReducer;
