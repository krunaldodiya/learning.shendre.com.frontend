import {call, put, select, takeEvery} from 'redux-saga/effects';
import {updateSubscription} from '../api/update_subscription';
import {
  UPDATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_FAIL,
  UPDATE_SUBSCRIPTION_SUCCESS,
} from '../constants/auth';

function* handleUpdateSubscription(action: any) {
  const authState = yield select(state => state.auth);

  try {
    const {data} = yield call(updateSubscription, {
      token: authState.token,
      ...action.payload,
    });

    yield put({type: UPDATE_SUBSCRIPTION_SUCCESS, payload: {user: data.user}});
  } catch (error) {
    yield put({
      type: UPDATE_SUBSCRIPTION_FAIL,
      payload: {errors: error.response.data},
    });
  }
}

function* updateSubscriptionWatcher() {
  yield takeEvery(UPDATE_SUBSCRIPTION, handleUpdateSubscription);
}

export {updateSubscriptionWatcher};
