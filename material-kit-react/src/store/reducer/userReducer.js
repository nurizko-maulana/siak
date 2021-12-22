import {
  USER_LOGIN, USER_LOGOUT, USER_SIGNUP, USERS_ERROR
} from '../types';

const intialValue = {
  auth: {
    kind: '',
    idToken: null,
    email: '',
    refreshToken: '',
    displayName: '',
    expiresIn: '',
    localId: '',
    registered: ''
  },
  loading: true,
  error: ''
};

const userReducer = (state = intialValue, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      localStorage.setItem('auth', action.payload);
      return {
        ...state,
        auth: action.payload,
        loading: false
      };
    case USER_LOGIN:
      localStorage.setItem('auth', action.payload);
      return {
        ...state,
        auth: action.payload,
        loading: false
      };
    case USER_LOGOUT:
      localStorage.removeItem('auth');
      return {
        ...state,
        auth: {},
        loading: false
      };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default userReducer;
