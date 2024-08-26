import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
