import {
  REQUEST_OTP,
  REQUEST_OTP_FAIL,
  REQUEST_OTP_SUCCESS,
  SET_MOBILE,
  VERIFY_OTP,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_SUCCESS,
  SET_CLIENT_OTP,
} from '../constants/otp';

const initialState = {
  loading: false,
  loaded: false,
  mobile: '',
  serverOtp: '',
  clientOtp: '',
  errors: null,
};

function otp(state = initialState, action: any) {
  switch (action.type) {
    case REQUEST_OTP: {
      return {...state, loading: true};
    }

    case REQUEST_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        serverOtp: action.payload.otp,
      };
    }

    case REQUEST_OTP_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        errors: action.payload.errors,
      };
    }

    case VERIFY_OTP: {
      return {...state, loading: true};
    }

    case VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }

    case VERIFY_OTP_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        errors: action.payload.errors,
      };
    }

    case SET_MOBILE: {
      return {
        ...state,
        mobile: action.payload.mobile,
      };
    }

    case SET_CLIENT_OTP: {
      return {
        ...state,
        clientOtp: action.payload.clientOtp,
      };
    }

    default:
      return state;
  }
}

export {otp};
