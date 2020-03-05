import {all} from 'redux-saga/effects';
import {loadQuizzesWatcher} from './load_quizzes';
import {requestOtpWatcher} from './request_otp';
import {verifyOtpWatcher} from './verify_otp';

function* rootSaga() {
  yield all([loadQuizzesWatcher(), requestOtpWatcher(), verifyOtpWatcher()]);
}

export {rootSaga};
