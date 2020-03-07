import {produce} from 'immer';
import {SET_CHAPTERS} from '../constants/chapters';

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {},
};

function chapters(state = initialState, {type, payload}: any) {
  switch (type) {
    case SET_CHAPTERS:
      return produce(state, (draftState: any) => {
        draftState.data = payload.chapters;
      });

    default:
      return state;
  }
}

export {chapters};
