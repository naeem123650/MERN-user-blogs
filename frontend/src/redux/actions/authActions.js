import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT = "LOGOUT";

const api_url = "http://localhost:3000/api/auth/";

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${api_url}/login`, { email, password });
    const { token } = res.data.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
    localStorage.setItem("token", token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${api_url}/register`, {
      username,
      email,
      password,
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data.message,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  const res = await axios.post(`${api_url}logout`, "", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  console.log(res);
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
