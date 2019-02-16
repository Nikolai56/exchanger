import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionTypes,
  requestRates,
  requestRatesSuccess,
  requestRatesError,
} from '../actions';

const APP_ID = '314315a90b8243d5bb2c1060cd7c738b';
//could be BASE const &base=${BASE}
const URL = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`;

/*function* fetchRates(action) {
    try {
        // const rates = yield call(Api.fetchRates, action.payload.userId);
        // yield put({type: "FETCH_SUCCEEDED", rates: rates});
    } catch (e) {
        yield put({type: "FETCH_FAILED", message: e.message});
    }
}*/

function* fetchRates() {
  try {
    yield put(requestRates());
    const data = yield call(() => {
      return fetch(URL)
        .then(res => res.json());
    }
    );
    yield put(requestRatesSuccess(data));
  } catch (error) {
    yield put(requestRatesError(error.message));
  }
}

function* rootSaga() {
  yield takeLatest(ActionTypes.FETCHED_RATES, fetchRates);
}

export default rootSaga;
