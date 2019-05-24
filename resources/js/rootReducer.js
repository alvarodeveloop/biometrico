import { combineReducers } from 'redux';
import auth from './reducer/auth';
import modal from './reducer/modalReduce';

export default combineReducers({
  auth,
  modal
});
