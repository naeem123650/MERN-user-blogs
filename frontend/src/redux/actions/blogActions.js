import axios from "axios";

export const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";
export const FETCH_BLOGS_FAIL = "FETCH_BLOGS_FAIL";
export const CREATE_BLOG_SUCCESS = "CREATE_BLOG_SUCCESS";
export const CREATE_BLOG_FAIL = "CREATE_BLOG_FAIL";
export const UPDATE_BLOG_SUCCESS = "UPDATE_BLOG_SUCCESS";
export const UPDATE_BLOG_FAIL = "UPDATE_BLOG_FAIL";
export const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";
export const DELETE_BLOG_FAIL = "DELETE_BLOG_FAIL";
export const USER_BLOG_SUCCESS = "USER_BLOG_SUCCESS";
export const USER_BLOG_FAIL = "USER_BLOG_FAIL";

const api_url = `${import.meta.env.VITE_API_URL}/blogs`;

export const fetchBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api_url}`);

    dispatch({
      type: FETCH_BLOGS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({
      type: FETCH_BLOGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const fetchUserBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api_url}/get-user-blogs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    dispatch({
      type: USER_BLOG_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({
      type: USER_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createBlog = (title, content) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${api_url}`,
      { title, content },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    console.log(res.data);

    dispatch({
      type: CREATE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({
      type: CREATE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateBlog = (id, title, content) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `/${id}`,
      { title, content },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    console.log(res.data);

    dispatch({
      type: UPDATE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await axios.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};
