import {combineReducers} from 'redux';
import {auth} from './auth';
import {categories} from './categories';
import {chapters} from './chapters';
import {otp} from './otp';
import {topics} from './topics';
import {videos} from './videos';

const rootReducer = combineReducers({
  auth,
  categories,
  chapters,
  otp,
  topics,
  videos,
});

export {rootReducer};
