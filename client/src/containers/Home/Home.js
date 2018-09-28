/*
* 근태 체크를 위한 메인 페이지
* 출근, 퇴근 체크
* 현재 남은 근무 시간 확인
* 팀원들의 현재 근무 상태 확인 : 근무 중. 외근. 근무 중 아님.
*/
import React, { Component } from 'react';

import Header from '../../components/Header';
import MyWorkStatusBox from '../../components/MyWorkStatusBox';

class Home extends Component {
    render() {
        return (
          <div>
            <Header />
            <div className="container">
              <MyWorkStatusBox />
            </div>
          </div>
        )
    }
}

export default Home;