import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { 
  CREATE_USER, 
  requestSuccess,
  setError,
  GET_AUTH
} from '../modules/login';
import {
  CREATE_START,
  createStartSuccess,
} from '../modules/home';

import request from '../../lib/utils/request.js';

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
  console.log(action.user);
  try {
    const res = yield call(request, '/api/users', {
      method: 'POST',
      data: JSON.stringify(action.user)
    });

    yield put(createStartSuccess());
  } catch (error) {
    yield put(setError(error));
  }
}

function* createStart(action) {
  try {
    const res = yield call(request, '/api/schedules/start', {
      method: 'POST'
    });

    console.log(res);

    yield put(createStartSuccess(res));
  } catch (error) {
    yield put(setError(error));   
  }
}

function* sagas() {
  yield takeLatest(GET_AUTH, getAuth);
  yield takeLatest(CREATE_USER, createUser);
  yield takeLatest(CREATE_START, createStart);
}

export default sagas;