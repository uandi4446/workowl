/*
* src/store/modules/home.js
* Home Conatiner의 redux type, action, reducer 정의
*/
import { fromJS } from 'immutable';
import moment from 'moment';

// constants 정의
export const CREATE_START = 'home/CREATE_START';
export const CREATE_START_SUCCESS = 'home/CREAT_START_SUCCESS';
export const REQUEST_SUCCESS = 'home/REQUEST_SUCCESS';
export const SET_ERROR = 'home/SET_ERROR';

export const setHome = () => {
    return {
        type: ''
    };
}

export const createStart = () => {
    return {
        type: CREATE_START,
    };
}

export const createStartSuccess = (data) => {
  return {
    type: CREATE_START_SUCCESS,
    schedule: data
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
    schedule: fromJS({
      date: false,
      start: false,
      end: false,
      isOutside: false,
      isHolyday: false,
      isPlan: false,
    }),
    errDetail: fromJS({
        status: false,
        code: false,
        message: false
    })
});

// Home reducer
export default function homeReducer (state = initialState, action) {
    switch (action.type) {
        case CREATE_START:
            return state
                .set('loading', false)
                .set('error', false)
        case CREATE_START_SUCCESS:
            return state
                .set('loading', true)
                .setIn(['schedule', 'date'], action.schedule.date)
                .setIn(['schedule', 'start'], action.schedule.start);
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