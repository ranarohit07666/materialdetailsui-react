import { jwtDecode } from "jwt-decode";
import api from "../../Interceptor/api-interceptor";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data.token;
    const decodedToken = jwtDecode(token);
    if (token) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { decodedtoken: decodedToken, authtoken: token }
      });
      alert("Login attempt sucessful");
      window.location.href = '/reference'
    } else {
      dispatch({
        type: LOGIN_FAILURE
      });
      alert(response.message || "Something went wrong")
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE
    });
    alert( "Something went wrong")
  }
};

export const logout = () => ({
  type: LOGOUT,
});

export const signupUser = (userData) => async (dispatch) => {
  try {
    delete userData.confirmPassword;
    const response = await api.post('/auth/signup', userData);
    if (response.status === 201) {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      alert("User Created Successfully");
      window.location.href='/login'
    } else {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: 'Something went wrong',
      });
      alert("User not created");
    }
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.response ? error.response.data.message : 'Something went wrong',
    });
    alert("User not created");
  }
};