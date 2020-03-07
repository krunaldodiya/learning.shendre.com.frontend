import {SET_VIDEOS} from '../constants/videos';

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {},
};

function videos(state = initialState, {type, payload}: any) {
  switch (type) {
    case SET_VIDEOS: {
      return {...state, data: payload.videos};
    }

    default:
      return state;
  }
}

export {videos};
