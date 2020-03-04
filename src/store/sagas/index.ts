import {all} from 'redux-saga/effects';
import {loadQuizzesWatcher} from './load_quizzes';

function* rootSaga() {
  yield all([loadQuizzesWatcher()]);
}

export {rootSaga};
