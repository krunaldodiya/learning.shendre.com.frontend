import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAIL,
  LOAD_CATEGORIES_SUCCESS,
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
    case LOAD_CATEGORIES: {
      return {...state, loading: true, loaded: false};
    }

    case LOAD_CATEGORIES_SUCCESS: {
      return {...state, loading: false, loaded: true, errors: null};
    }

    case LOAD_CATEGORIES_FAIL: {
      return {...state, loading: false, loaded: true, errors: payload.errors};
    }

    case SET_CATEGORIES: {
      return {...state, data: payload.categories};
    }

    default:
      return state;
  }
}

export {categories};
