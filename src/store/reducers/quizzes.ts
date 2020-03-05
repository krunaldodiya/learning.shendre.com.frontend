import {produce} from 'immer';
import {
  LOAD_QUIZZES,
  LOAD_QUIZZES_FAIL,
  LOAD_QUIZZES_SUCCESS,
} from '../constants/quiz';

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {
    entities: {
      quizzes: {},
    },
    result: [],
  },
};

function quizzes(state = initialState, {type, payload}: any) {
  switch (type) {
    case LOAD_QUIZZES:
      return produce(state, (draftState: any) => {
        draftState.loading = true;
      });

    case LOAD_QUIZZES_SUCCESS:
      return produce(state, (draftState: any) => {
        draftState.data = payload;
        draftState.loading = false;
        draftState.loaded = true;
      });

    case LOAD_QUIZZES_FAIL:
      return produce(state, (draftState: any) => {
        draftState.errors = payload;
        draftState.loading = false;
        draftState.loaded = true;
      });

    default:
      return state;
  }
}

export {quizzes};
