import {all} from 'redux-saga/effects';
import {loadQuizzesWatcher} from './load_quizzes';
import {requestOtpWatcher} from './request_otp';
import {updateProfileWatcher} from './update_profile';
import {verifyOtpWatcher} from './verify_otp';

function* rootSaga() {
  yield all([
    loadQuizzesWatcher(),
    requestOtpWatcher(),
    verifyOtpWatcher(),
    updateProfileWatcher(),
  ]);
}

export {rootSaga};
