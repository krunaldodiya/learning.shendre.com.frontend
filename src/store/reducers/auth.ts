import {screens} from '../../libs/screens';
import {
  GET_AUTH_USER,
  GET_AUTH_USER_FAIL,
  GET_AUTH_USER_SUCCESS,
  SET_INITIAL_SCREEN,
  SET_TOKEN,
  SET_USER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_FAIL,
  UPDATE_SUBSCRIPTION_SUCCESS,
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

    case GET_AUTH_USER: {
      return {...state, loading: true, loaded: false};
    }

    case GET_AUTH_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload.user,
        errors: null,
      };
    }

    case GET_AUTH_USER_FAIL: {
      return {...state, loading: false, loaded: true, errors: payload.errors};
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

    case UPDATE_SUBSCRIPTION: {
      return {...state, loading: true, loaded: false};
    }

    case UPDATE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload.user,
        errors: null,
      };
    }

    case UPDATE_SUBSCRIPTION_FAIL: {
      return {...state, loading: false, loaded: true, errors: payload.errors};
    }

    default: {
      return state;
    }
  }
}

export {auth};
