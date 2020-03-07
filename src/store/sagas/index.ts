import {all} from 'redux-saga/effects';
import {getAuthUserWatcher} from './get_auth_user';
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
    getAuthUserWatcher(),
  ]);
}

export {rootSaga};
