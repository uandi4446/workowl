/*
* History Container
* 출퇴근 이력을 보여주는 페이지
* 날짜별 출근 / 퇴근 시간
* 예정 출근 / 퇴근 시간보다 +/- 된 시간
* 
*/

import React, { Component } from 'react';

import './History.css';

import Header from '../../components/Header';

class History extends Component {
    render() {
        return (
            <div className={History}>
               <Header /> 
            </div>
        );
    }
}

export default History;
