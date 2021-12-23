import {
  USER_LOGIN, USER_LOGOUT, USER_SIGNUP, USERS_ERROR, SET_TOKEN
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
      localStorage.setItem(
        'displayName',
        JSON.stringify(action.payload.displayName)
      );
      return {
        ...state,
        auth: action.payload,
        loading: false
      };
    case USER_LOGIN:
      console.log('reducer login', JSON.stringify(action.payload));
      localStorage.setItem('auth', JSON.stringify(action.payload.idToken));
      localStorage.setItem(
        'displayName',
        JSON.stringify(action.payload.displayName)
      );
      return {
        ...state,
        auth: action.payload,
        loading: false
      };
    case USER_LOGOUT:
      localStorage.removeItem('auth');
      localStorage.removeItem('displayName');
      return {
        ...state,
        auth: {},
        error: '',
        loading: false
      };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_TOKEN:
      return {
        ...state,
        auth: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default userReducer;
