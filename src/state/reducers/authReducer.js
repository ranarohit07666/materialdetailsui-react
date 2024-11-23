import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../actions/authAction';

const initialState = JSON.parse(localStorage.getItem('globalState')) || {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.decodedtoken,
        token: action.payload.authtoken,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        error: null,
      };
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
