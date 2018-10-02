/*
* src/store/modules/login.js
* Login Conatiner의 redux type, action, reducer 정의
*/
import { fromJS } from 'immutable';

// constants 정의
export const SET_LOGIN = 'login/SET_LOGIN';
export const GET_AUTH = 'login/GET_AUTH';
export const CREATE_USER = 'login/CREATE_USER';
export const REQUEST_SUCCESS = 'login/REQUEST_SUCCESS';
export const SET_ERROR = 'login/SET_ERROR';

export const setLogin = () => {
    return {
        type: SET_LOGIN
    };
}

export const getAuth = (user) => {
    return {
        type: GET_AUTH,
        user: user
    };
}

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        user: user
    }
}

export const requestSuccess = () => {
    return {
        type: REQUEST_SUCCESS
    }
}

export const setError = (err) => {
    return {
        type: SET_ERROR,
        err: err
    }
}

// 초기 상태
const initialState = fromJS({
    loading: false,
    error: false,
    user: fromJS({
        id: false,
        pwd: false,
        name: false
    }),
    errDetail: fromJS({
        status: false,
        code: false,
        message: false
    })
});

// Login reducer
export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return state
                .set('loading', false)
                .set('error', false);
        case GET_AUTH:
            return state
                .set('loading', false)
                .set('error', false)
                .setIn(['user', 'id'], action.user.id)
                .setIn(['user', 'pwd'], action.user.pwd);
        case CREATE_USER:
            return state
                .set('loading', false)
                .set('error', false)
                .setIn(['user', 'id'], action.user.id)
                .setIn(['user', 'pwd'], action.user.pwd)
                .setIn(['user', 'name'], action.user.name);
        case REQUEST_SUCCESS:
            return state
                .set('loading', true);
        case SET_ERROR:
            return state
                .set('error', true)
                .setIn(['errDetail', 'status'], action.err.status)
                .setIn(['errDetail', 'code'], action.err.code)
                .setIn(['errDetail', 'message'], action.err.message);
        default:
            return state;
    }
}