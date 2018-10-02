/*
* 근태 체크를 위한 메인 페이지
* 출근, 퇴근 체크
* 현재 남은 근무 시간 확인
* 팀원들의 현재 근무 상태 확인 : 근무 중. 외근. 근무 중 아님.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as homeActions from '../../store/modules/home.js';

import './Home.css';

import Header from '../../components/Header';
import MyWorkStatusBox from '../../components/MyWorkStatusBox';
import TeamMemberWorkStatusBox from '../../components/TeamMemberWorkStatusBox';
import WorkStatusExplainBox from '../../components/WorkStatusExplainBox';

class Home extends Component {
  setWorkStatus() {
    console.log(this.props);
    if (this.props.end) {
      return 'finish';
    } else if (this.props.isOutside) {
      return 'outside';
    } else if (this.props.start) {
      return 'work';
    } else if (this.props.isHoliday) {
      return 'holiday';
    } else {
      return 'notWork';
    }
  }

    handleSubmit(event) {
      switch (event) {
        case 'start':
          this.props.workStart();
          break;
        default:
          break;
      }
    }

    render() {
        let workStatus = this.setWorkStatus();

        return (
          <div>
            <Header />
            <div className="container">
              <MyWorkStatusBox
                status={workStatus}
                workStart={this.props.start}
                workEnd={this.props.end}
                onSubmit={this.handleSubmit.bind(this)}
              />
              <WorkStatusExplainBox />
              <div className="Home-memberRow">
                <TeamMemberWorkStatusBox />
                <TeamMemberWorkStatusBox />
                <TeamMemberWorkStatusBox />
              </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
  loading: state.home.get('loading'),
  error: state.home.get('error'),
  start: state.home.getIn(['schedule', 'start']),
  end: state.home.getIn(['schedule', 'end']),
  isOutside: state.home.getIn(['schedule', 'isOutside']),
  isHoliday: state.home.getIn(['schedule', 'isHolyday']),
  isPlan: state.home.getIn(['schedule', 'isPlan'])
});

const mapDispatchToProps = (dispatch) => ({
  workStart: () => dispatch(homeActions.createStart()),
  setHome: () => dispatch(homeActions.setHome())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);