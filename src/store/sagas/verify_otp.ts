import {call, put, takeEvery} from 'redux-saga/effects';
import {screens} from '../../libs/screens';
import {verifyOtp} from '../api/verify_otp';
import {SET_INITIAL_SCREEN, SET_TOKEN, SET_USER} from '../constants/auth';
import {
  VERIFY_OTP,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_SUCCESS,
} from '../constants/otp';

function* handleVerifyOtp(action: any) {
  const {navigation, mobile, otp, imei} = action.payload;

  try {
    const {data} = yield call(verifyOtp, {mobile, otp, imei});

    const initial_screen =
      data.user.status === true ? screens.Home : screens.EditProfile;

    yield put({type: VERIFY_OTP_SUCCESS});
    yield put({type: SET_USER, payload: data.user});
    yield put({type: SET_TOKEN, payload: data.token});
    yield put({type: SET_INITIAL_SCREEN, payload: {initial_screen}});

    navigation.replace(initial_screen);
  } catch (error) {
    yield put({
      type: VERIFY_OTP_FAIL,
      payload: {errors: error.response.data},
    });
  }
}

function* verifyOtpWatcher() {
  yield takeEvery(VERIFY_OTP, handleVerifyOtp);
}

export {verifyOtpWatcher};
