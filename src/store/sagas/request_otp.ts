// import {CommonActions} from '@react-navigation/native';
import {call, put, takeEvery} from 'redux-saga/effects';
// import {screens} from '../../libs/screens';
import {requestOtp} from '../api/request_otp';
import {
  REQUEST_OTP,
  REQUEST_OTP_FAIL,
  REQUEST_OTP_SUCCESS,
} from '../constants/otp';

function* handleRequestOtp(action: any) {
  try {
    const {data} = yield call(requestOtp, {mobile: action.payload.mobile});

    yield put({type: REQUEST_OTP_SUCCESS, payload: data});
    // yield put(CommonActions.navigate({name: screens.VerifyOtp}));
  } catch (error) {
    yield put({
      type: REQUEST_OTP_FAIL,
      payload: {errors: error.response.data},
    });
  }
}

function* requestOtpWatcher() {
  yield takeEvery(REQUEST_OTP, handleRequestOtp);
}

export {requestOtpWatcher};
