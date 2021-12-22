import axios from 'axios';
import {
  USER_SIGNUP, USER_LOGIN, USER_LOGOUT, USERS_ERROR
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const userSignUp = (email, password) => async (dispatch) => {
  const postData = {
    email,
    password,
    kembaliSecureToken: true
  };

  await axios
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl5291tln9OXHJrGnJimgqHgvZjsyD1vU',
      postData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then((res) => {
      dispatch({
        type: USER_SIGNUP,
        payload: res.data
      });
      console.log(res);
    })
    .catch((e) => {
      dispatch({
        type: USERS_ERROR,
        payload: e.response.data.error.message
      });
    });
};
export const userLogin = (email, password) => async (dispatch) => {
  const postData = {
    email,
    password,
    kembaliSecureToken: true
  };

  await axios
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCl5291tln9OXHJrGnJimgqHgvZjsyD1vU',
      postData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then((res) => {
      dispatch({
        type: USER_LOGIN,
        payload: res.data
      });
      console.log(res);
    })
    .catch((e) => {
      console.log('error login', e.response.data.error.message);
      dispatch({
        type: USERS_ERROR,
        payload: e.response.data.error.message
      });
    });
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT
    });
    console.log('user logout');
  } catch (e) {
    dispatch({
      type: USERS_ERROR,
      payload: console.log(e)
    });
  }
};
