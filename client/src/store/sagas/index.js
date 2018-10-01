import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { 
    CREATE_USER, 
    createUserSuccess,
    setError,
    GET_AUTH
} from '../modules/login';

import request from '../../lib/utils/request.js';

function* getAuth(action) {
    try {
        const res = yield call(request, '/api/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(action.user)
        });

        console.log(res);
    } catch (error) {
        yield put(setError(error));
    }
}

function* createUser(action) {
    try {
        const res = yield call(request, '/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(action.user)
        });

        yield put(createUserSuccess());
    } catch (error) {
        yield put(setError(error));
    }
}

function* sagas() {
    yield takeLatest(GET_AUTH, getAuth);
    yield takeLatest(CREATE_USER, createUser);
}

export default sagas;