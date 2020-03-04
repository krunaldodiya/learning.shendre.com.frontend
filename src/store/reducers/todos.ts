import {produce} from 'immer';
import {ADD_TODO} from '../constants';

const initialState = {
  data: [],
};

function todos(state = initialState, {type, payload}: any) {
  switch (type) {
    case ADD_TODO:
      return produce(state, (draftState: any) => {
        draftState.data.unshift(payload);
      });

    default:
      return state;
  }
}

export {todos};
