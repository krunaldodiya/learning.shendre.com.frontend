import {all} from 'redux-saga/effects';
import {loadCategoriesWatcher} from './load_categories';
import {requestOtpWatcher} from './request_otp';
import {updateProfileWatcher} from './update_profile';
import {verifyOtpWatcher} from './verify_otp';

function* rootSaga() {
  yield all([
    loadCategoriesWatcher(),
    requestOtpWatcher(),
    verifyOtpWatcher(),
    updateProfileWatcher(),
  ]);
}

export {rootSaga};
