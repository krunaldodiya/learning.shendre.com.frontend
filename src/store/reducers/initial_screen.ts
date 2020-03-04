import {SET_INITIAL_SCREEN} from '../constants';

const initialState = {
  screen: 'Login',
};

function initialScreen(state = initialState, {type, payload}: any) {
  switch (type) {
    case SET_INITIAL_SCREEN: {
      return {...state, screen: payload};
    }

    default:
      return state;
  }
}

export {initialScreen};
