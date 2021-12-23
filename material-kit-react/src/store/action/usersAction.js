import axios from 'axios';
import {
  USER_SIGNUP,
  USER_LOGIN,
  USER_LOGOUT,
  USERS_ERROR,
  SET_TOKEN
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const userSignUp = (email, password, displayName) => async (dispatch) => {
  const postData = {
    email,
    password,
    returnSecureToken: true
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
    .then(async (res) => {
      localStorage.setItem('auth', JSON.stringify(res.data.idToken));
      console.log('token auth action', res.data.idToken);
      const updateData = {
        idToken: res.data.idToken,
        returnSecureToken: true,
        displayName
      };
      await axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCl5291tln9OXHJrGnJimgqHgvZjsyD1vU',
          updateData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res2) => {
          console.log(res2);
          dispatch({
            type: USER_SIGNUP,
            payload: res2.data
          });
        })
        .catch((e) => {
          dispatch({
            type: USERS_ERROR,
            payload: e.response.data.error.message
          });
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

export const setToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};
