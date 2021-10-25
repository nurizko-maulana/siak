import { GET_USERS } from '../types';

const intialValue = {
  users: [],
  loading: true
};

const userReducer = (state = intialValue, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default userReducer;
