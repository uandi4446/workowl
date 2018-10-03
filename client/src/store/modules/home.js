/*
* src/store/modules/home.js
* Home Conatiner의 redux type, action, reducer 정의
*/
import { fromJS } from 'immutable';
import moment from 'moment';

// constants 정의
export const CREATE_START = 'home/CREATE_START';
export const CREATE_START_SUCCESS = 'home/CREATE_START_SUCCESS';
export const CREATE_END = 'home/CREATE_END';
export const CREATE_END_SUCCESS = 'home/CREATE_END_SUCCESS';
export const READ_TODAY_WORK = 'home/READ_TODAY_WORK';
export const READED_TODAY_WORK = 'home/READED_TODAY_WORK';
export const READ_TODAY_PLAN = 'home/READ_TODAY_PLAN';
export const READED_TODAY_PLAN = 'home/READED_TODAY_PLA';
export const READ_TEAM_TODAY_WORK = 'home/READ_TEAM_TODAY_WORK';
export const READED_TEAM_TODAY_WORK = 'home/READED_TEAM_TODAY_WORK';

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

export const createEnd = () => {
    return {
        type: CREATE_END
    }
}

export const createEndSuccess = (data) => {
    return {
        type: CREATE_END_SUCCESS,
        schedule: data
    }
}

export const readTodayWork = () => {
    return {
        type: READ_TODAY_WORK,
    }
}

export const readedTodayWork = (data) => {
    return {
        type: READED_TODAY_WORK,
        schedule: data
    }
}

export const readTodayPlan = () => {
    return {
        type: READ_TODAY_PLAN
    }
}

export const readedTodayPlan = (data) => {
    return {
        type: READED_TODAY_PLAN,
        plan: data
    }
}

export const readTeamTodayWork = () => {
    return {
        type: READ_TEAM_TODAY_WORK
    }
}

export const readedTeamTodayWork = (data) => {
    return {
        type: READED_TEAM_TODAY_WORK,
        users: data
    }
}

// 초기 상태
const initialState = fromJS({
    schedule: false,
    plan: false,
    users: false
});

// Home reducer
export default function homeReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_START:
      return state;
    case CREATE_START_SUCCESS:
      return state
        .set('schedule', action.schedule);
    case CREATE_END:
      return state;
    case CREATE_END_SUCCESS:
      return state
        .set('schedule', action.schedule);
    case READ_TODAY_WORK:
      return state;
    case READED_TODAY_WORK:
      return state
        .set('schedule', action.schedule);
    case READ_TODAY_PLAN:
      return state;
    case READED_TODAY_PLAN:
      return state
        .set('plan', action.plan);
    case READ_TEAM_TODAY_WORK:
      return state;
    case READED_TEAM_TODAY_WORK:
      return state
        .set('users', action.users);
    default:
      return state;
    }
}