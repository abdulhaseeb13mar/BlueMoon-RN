import {combineReducers} from 'redux';
import ActionTypes from './actionTypes';

let currentProduct = {};

let UserInfo = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
};

const currentProductReducer = (state = currentProduct, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PRODUCT:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const UserInfoReducer = (state = UserInfo, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_INFO:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({
  currentProductReducer,
  UserInfoReducer,
});
