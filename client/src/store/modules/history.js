/*
* src/store/modules/history.js
* History Conatiner의 redux type, action, reducer 정의
*/
import { fromJS } from 'immutable';

// constants 정의
export const READ_HISTORY = 'history/READ_HISTORY';
export const READ_HISTORY_SUCCESS = 'history/READ_HISTORY_SUCCESS';

export const setHistory = () => {
    return {
        type: ''
    }
};

export const readHistory = (data) => {
    return {
        type: READ_HISTORY,
        userId: data.userId,
        date: data.date
    }
}

export const readHistorySuccess = (data) => {
    return {
        type: READ_HISTORY_SUCCESS,
        schedules: data
    }
}

// 초기 상태
const initialState = fromJS({
    userId: false,
    date: false,
    schedules: false
});

// History Reducer
export default function historyReducer (state = initialState, action) {
    switch (action.type) {
        case READ_HISTORY:
            return state
                .set('userId', action.userId)
                .set('date', action.date);
        case READ_HISTORY_SUCCESS:
            return state
                .set('schedules', action.schedules);
        default:
            return state;
    }
}
