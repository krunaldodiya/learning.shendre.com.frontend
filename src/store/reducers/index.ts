import {combineReducers} from 'redux';
import {auth} from './auth';
import {otp} from './otp';
import {quizzes} from './quizzes';

const rootReducer = combineReducers({
  auth,
  otp,
  quizzes,
});

export {rootReducer};
