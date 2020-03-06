import {screens} from '../../libs/screens';
import {
  SET_INITIAL_SCREEN,
  SET_TOKEN,
  SET_USER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/auth';

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  token: null,
  user: null,
  initial_screen: screens.RequestOtp,
};

function auth(state = initialState, {type, payload}: any) {
  switch (type) {
    case SET_INITIAL_SCREEN: {
      return {...state, initial_screen: payload.initial_screen};
    }

    case SET_TOKEN: {
      return {...state, token: payload.token};
    }

    case SET_USER: {
      return {...state, user: payload.user};
    }

    case UPDATE_PROFILE: {
      return {...state, loading: true, loaded: false};
    }

    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload.user,
        errors: null,
      };
    }

    case UPDATE_PROFILE_FAIL: {
      return {...state, loading: false, loaded: true, errors: payload.errors};
    }

    default: {
      return state;
    }
  }
}

export {auth};
