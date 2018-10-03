/*
* Error 처리를 위한 Reducer
*/
import { fromJS } from 'immutable';

export const SET_ERROR = 'error/SET_ERROR';
export const RESET_ERROR = 'error/RESET_ERROR';

export const setError = (err) => {
  return {
      type: SET_ERROR,
      err: err
  }
}

export const resetError = () => {
  return {
    type: RESET_ERROR
  }
}

const initialState = fromJS({
  error: false,
  errDetail: fromJS({
    status: false,
    code: false,
    message: false
  })
});

export default function errorReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return state
        .set('error', true)
        .setIn(['errDetail', 'status'], action.err.status)
        .setIn(['errDetail', 'code'], action.err.code)
        .setIn(['errDetail', 'message'], action.err.message);
    case RESET_ERROR:
      return initialState;
    default:
      return state;
  }
}