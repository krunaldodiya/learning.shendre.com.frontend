import {CHANGE_NAME} from '../constants';

const initialState = {
  name: 'krunal',
};

function person(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_NAME:
      return {...state, name: action.payload.name};
    default:
      return state;
  }
}

export {person};
