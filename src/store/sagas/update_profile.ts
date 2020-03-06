import {call, put, select, takeEvery} from 'redux-saga/effects';
import {screens} from '../../libs/screens';
import {updateProfile} from '../api/update_profile';
import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  SET_INITIAL_SCREEN,
} from '../constants/auth';

function* handleUpdateProfile(action: any) {
  const token = yield select(state => state.auth.token);

  const {navigation, user} = action.payload;

  try {
    const {data} = yield call(updateProfile, {user, token});

    yield put({type: UPDATE_PROFILE_SUCCESS, payload: data});
    yield put({
      type: SET_INITIAL_SCREEN,
      payload: {initial_screen: screens.Home},
    });

    navigation.replace(screens.Home);
  } catch (error) {
    yield put({
      type: UPDATE_PROFILE_FAIL,
      payload: {errors: error.response.data},
    });
  }
}

function* updateProfileWatcher() {
  yield takeEvery(UPDATE_PROFILE, handleUpdateProfile);
}

export {updateProfileWatcher};
