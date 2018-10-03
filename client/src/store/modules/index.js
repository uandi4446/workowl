/*
* Comine Reducers
* making multiple reduers in store directory and comine them together in here
* store 디렉터리 내 생성한 여러개의 리듀서를 하나의 리듀서로 통합
*/

import { combineReducers } from 'redux';

import login from './login.js';
import home from './home.js';
import error from './error.js';

export default combineReducers({
    login,
    home,
    error
});