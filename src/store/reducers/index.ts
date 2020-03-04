import {combineReducers} from 'redux';
import {person} from './person';
import {todos} from './todos';
import {quizzes} from './quizzes';
import {initialScreen} from './initial_screen';

const rootReducer = combineReducers({
  person,
  todos,
  quizzes,
  initialScreen,
});

export {rootReducer};
