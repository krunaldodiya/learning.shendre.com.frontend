import {
  REQUEST_OTP,
  SET_MOBILE,
  SET_CLIENT_OTP,
  VERIFY_OTP,
} from '../constants/otp';

export function setMobile(mobile: string) {
  return {
    type: SET_MOBILE,
    payload: {mobile},
  };
}

export function setClientOtp(clientOtp: string) {
  return {
    type: SET_CLIENT_OTP,
    payload: {clientOtp},
  };
}

export function requestOtp(mobile: string) {
  return {
    type: REQUEST_OTP,
    payload: {mobile},
  };
}

export function verifyOtp(mobile: string, otp: string, imei: string) {
  return {
    type: VERIFY_OTP,
    payload: {mobile, otp, imei},
  };
}
