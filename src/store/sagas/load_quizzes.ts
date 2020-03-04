import {call, put, takeEvery} from 'redux-saga/effects';
import {
  LOAD_QUIZZES,
  LOAD_QUIZZES_FAIL,
  LOAD_QUIZZES_SUCCESS,
} from '../constants';

import {loadQuizzes} from '../api/quizzes';
import {quizList} from '../schema';
import {normalize} from 'normalizr';

function* handleLoadQuizzes(action: any) {
  try {
    const {data} = yield call(loadQuizzes, action.payload);

    const normalizedData = normalize(data.quizzes, quizList);

    yield put({
      type: LOAD_QUIZZES_SUCCESS,
      payload: normalizedData,
    });
  } catch (error) {
    yield put({
      type: LOAD_QUIZZES_FAIL,
      payload: {errors: error.response.data},
    });
  }
}

function* loadQuizzesWatcher() {
  yield takeEvery(LOAD_QUIZZES, handleLoadQuizzes);
}

export {loadQuizzesWatcher};
