import {produce} from 'immer';
import {SET_VIDEOS} from '../constants/videos';

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {},
};

function videos(state = initialState, {type, payload}: any) {
  switch (type) {
    case SET_VIDEOS:
      return produce(state, (draftState: any) => {
        draftState.data = payload.videos;
      });

    default:
      return state;
  }
}

export {videos};
