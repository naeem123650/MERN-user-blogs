import {
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAIL,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  USER_BLOG_SUCCESS,
  USER_BLOG_FAIL,
} from "../actions/blogActions";

const initialState = {
  blogs: [],
  error: null,
  userBlogs: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
        error: null,
      };
    case FETCH_BLOGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
        error: null,
      };
    case CREATE_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        error: null,
      };
    case UPDATE_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        error: null,
      };
    case DELETE_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case USER_BLOG_SUCCESS:
      return {
        ...state,
        userBlogs: action.payload,
        error: null,
      };
    case USER_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
