import { combineReducers } from 'redux';
import userReducer from './userReducer';
import masterReducer from './masterReducer';

export default combineReducers({
  users: userReducer,
  master: masterReducer
});
