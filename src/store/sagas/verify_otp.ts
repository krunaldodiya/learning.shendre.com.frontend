// import {CommonActions} from '@react-navigation/native';
import {call, put, takeEvery} from 'redux-saga/effects';
import {screens} from '../../libs/screens';
import {verifyOtp} from '../api/verify_otp';
import {SET_AUTH, SET_INITIAL_SCREEN} from '../constants/auth';
// import {screens} from '../../libs/screens';
import {
  VERIFY_OTP,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_SUCCESS,
} from '../constants/otp';

function* handleVerifyOtp(action: any) {
  try {
    const {data} = yield call(verifyOtp, action.payload);

    const initial_screen =
      data.user.status === true ? screens.Home : screens.EditProfile;

    yield put({type: VERIFY_OTP_SUCCESS});
    yield put({type: SET_AUTH, payload: data});
    yield put({type: SET_INITIAL_SCREEN, payload: {initial_screen}});
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
