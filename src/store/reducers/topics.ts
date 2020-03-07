import {produce} from 'immer';
import {SET_TOPICS} from '../constants/topics';

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {},
};

function topics(state = initialState, {type, payload}: any) {
  switch (type) {
    case SET_TOPICS:
      return produce(state, (draftState: any) => {
        draftState.data = payload.topics;
      });

    default:
      return state;
  }
}

export {topics};
