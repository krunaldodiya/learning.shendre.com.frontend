import {screens} from '../../libs/screens';
import {SET_INITIAL_SCREEN, SET_AUTH} from '../constants/auth';

const initialState = {
  token: null,
  user: null,
  initial_screen: screens.RequestOtp,
};

function auth(state = initialState, {type, payload}: any) {
  switch (type) {
    case SET_INITIAL_SCREEN: {
      return {...state, initial_screen: payload.initial_screen};
    }

    case SET_AUTH: {
      return {...state, token: payload.token, user: payload.user};
    }

    default: {
      return state;
    }
  }
}

export {auth};
