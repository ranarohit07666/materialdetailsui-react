import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import store from '../state/store/store';
import { logout } from '../state/actions/authAction';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState(); 
    const token = state.auth?.token;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log(currentTime)
        console.log("jyfhjyf", decodedToken.exp)
        if (decodedToken.exp < currentTime) {
          store.dispatch(logout());
          window.location.href = '/login';
          return Promise.reject(new Error('Token expired'));
        }
        config.headers['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error('Invalid token', err);
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return config;
  },
  (error) => console.error(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout()); 
      window.location.href = '/login'; 
    }
    if (error.response && error.response.status === 403) {
      alert("Not Authorized");
    }
    console.error(error);
    return;
  }
);

export default api;
