import {call, put, select, takeEvery} from 'redux-saga/effects';
import {getAuthUser} from '../api/get_auth_user';
import {
  GET_AUTH_USER,
  GET_AUTH_USER_FAIL,
  GET_AUTH_USER_SUCCESS,
} from '../constants/auth';

function* handleGetAuthUser(action: any) {
  const authState = yield select(state => state.auth);

  try {
    const {data} = yield call(getAuthUser, {token: authState.token});

    yield put({type: GET_AUTH_USER_SUCCESS, payload: {user: data.user}});
  } catch (error) {
    yield put({
      type: GET_AUTH_USER_FAIL,
      payload: {errors: error.response.data},
    });
  }
}

function* getAuthUserWatcher() {
  yield takeEvery(GET_AUTH_USER, handleGetAuthUser);
}

export {getAuthUserWatcher};
