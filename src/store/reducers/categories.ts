import {produce} from 'immer';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAIL,
  SET_CATEGORIES,
} from '../constants/category';

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {},
};

function categories(state = initialState, {type, payload}: any) {
  switch (type) {
    case LOAD_CATEGORIES:
      return produce(state, (draftState: any) => {
        draftState.loading = true;
        draftState.loaded = false;
      });

    case LOAD_CATEGORIES_SUCCESS:
      return produce(state, (draftState: any) => {
        draftState.errors = null;
        draftState.loading = false;
        draftState.loaded = true;
      });

    case LOAD_CATEGORIES_FAIL:
      return produce(state, (draftState: any) => {
        draftState.errors = payload.errors;
        draftState.loading = false;
        draftState.loaded = true;
      });

    case SET_CATEGORIES:
      return produce(state, (draftState: any) => {
        draftState.data = payload.categories;
      });

    default:
      return state;
  }
}

export {categories};
