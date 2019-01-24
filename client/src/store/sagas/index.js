/*
* redux-saga index.js
* request to api and return the answer
* basically, every request will retrun response.body.data from util/request
*/
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { 
  CREATE_USER, 
  GET_AUTH,
  requestSuccess
} from '../modules/login.js';
import {
  CREATE_START,
  CREATE_END,
  READ_TODAY_WORK,
  READ_TODAY_PLAN,
  READ_TEAM_TODAY_WORK,
  createStartSuccess,
  createEndSuccess,
  readedTodayWork,
  readedTodayPlan,
  readedTeamTodayWork,
} from '../modules/home.js';
import {
  READ_HISTORY,
  readHistorySuccess
} from '../modules/history.js';
import { setError } from '../modules/error.js';

import request from '../../lib/utils/request.js';

// Login request
function* getAuth(action) {
  try {
    const res = yield call(request, '/api/auth', {
        method: 'POST',
        data: JSON.stringify(action.user)
    });
    localStorage.setItem('access-token', res.token);
    yield put(requestSuccess());
  } catch (error) {
    yield put(setError(error));
  }
}

function* createUser(action) {
  try {
    const res = yield call(request, '/api/users', {
      method: 'POST',
      data: JSON.stringify(action.user)
    });

    yield put(requestSuccess());
  } catch (error) {
    yield put(setError(error));
  }
}

// Home request
function* createStart(action) {
  try {
    const res = yield call(request, '/api/schedules/start', {
      method: 'POST'
    });

    yield put(createStartSuccess(res));
  } catch (error) {
    yield put(setError(error));   
  }
}

function* createEnd(action) {
  try {
    const res = yield call(request, '/api/schedules/end', {
      method: 'POST'
    });
    yield put(createEndSuccess(res));
  } catch (error) {
    yield put(setError(error)); 
  }
}

function* getTodayWork(action) {
  try {
    const res = yield call(request, '/api/schedule/today', {
      method: 'GET'
    });
    yield put(readedTodayWork(res));
  } catch (error) {
    yield put(setError(error));
  }
}

function* getTodayPlan(action) {
  try {
    const res = yield call(request, '/api/schedule/plan', {
      method: 'GET'
    });
    yield put(readedTodayPlan(res));
  } catch (error) {
    yield put(setError(error)); 
  }
}

function* getTeamTodayWork(action) {
  try {
    const res = yield call(request, '/api/schedule/team', {
      method: 'GET'
    });
    yield put(readedTeamTodayWork(res));
  } catch (error) {
    yield put(setError(error)); 
  }
}

function* getHistory(action) {
  try {
    let data = {
      date: action.date
    }
    const res = yield call(request, `/api/schedules/${action.userId}`, {
      method: 'POST',
      data: JSON.stringify(data)
    });
    yield put(readHistorySuccess(res));
  } catch (error) {
    yield put(setError(error));
  }
}

function* sagas() {
  yield takeLatest(GET_AUTH, getAuth);
  yield takeLatest(CREATE_USER, createUser);
  yield takeLatest(CREATE_START, createStart);
  yield takeLatest(CREATE_END, createEnd);
  yield takeEvery(READ_TODAY_WORK, getTodayWork);
  yield takeEvery(READ_TODAY_PLAN, getTodayPlan);
  yield takeEvery(READ_TEAM_TODAY_WORK, getTeamTodayWork);
  yield takeEvery(READ_HISTORY, getHistory);
}

export default sagas;