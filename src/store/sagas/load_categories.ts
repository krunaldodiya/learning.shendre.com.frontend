import {normalize} from 'normalizr';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {loadCategories} from '../api/load_categories';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAIL,
  LOAD_CATEGORIES_SUCCESS,
  SET_CATEGORIES,
} from '../constants/category';
import {SET_CHAPTERS} from '../constants/chapters';
import {SET_TOPICS} from '../constants/topics';
import {SET_VIDEOS} from '../constants/videos';
import {categoryList} from '../schema';

function* handleLoadCategories(action: any) {
  const authState = yield select(state => state.auth);

  try {
    const {data} = yield call(loadCategories, {token: authState.token});

    const {entities} = normalize(data.categories, categoryList);
    const {categories, topics, chapters, videos} = entities;

    yield put({type: SET_CATEGORIES, payload: {categories}});
    yield put({type: SET_TOPICS, payload: {topics}});
    yield put({type: SET_CHAPTERS, payload: {chapters}});
    yield put({type: SET_VIDEOS, payload: {videos}});

    yield put({type: LOAD_CATEGORIES_SUCCESS});
  } catch (error) {
    yield put({
      type: LOAD_CATEGORIES_FAIL,
      payload: {errors: error.response.data},
    });
  }
}

function* loadCategoriesWatcher() {
  yield takeEvery(LOAD_CATEGORIES, handleLoadCategories);
}

export {loadCategoriesWatcher};
