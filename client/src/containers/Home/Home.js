/*
* 근태 체크를 위한 메인 페이지
* 출근, 퇴근 체크
* 현재 남은 근무 시간 확인
* 팀원들의 현재 근무 상태 확인 : 근무 중. 외근. 근무 중 아님.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import * as homeActions from '../../store/modules/home.js';
import * as errorActions from '../../store/modules/error.js';

import './Home.css';

import Header from '../../components/Header';
import MyWorkStatusBox from '../../components/MyWorkStatusBox';
import TeamMemberWorkStatusBox from '../../components/TeamMemberWorkStatusBox';
import WorkStatusExplainBox from '../../components/WorkStatusExplainBox';
import AlertMessage from '../../components/AlertMessage';

class Home extends Component {
  componentDidMount() {
    this.props.resetError();
    this.props.getTodayWork();
    this.props.getTodayPlan();
    this.props.getTeamTodayWork();
  }

  setWorkStatus(schedule, plan) {
    if (!schedule && !plan) {
      return 'notWork';
    } else if (schedule.end) {
      return 'finish';
    } else if (schedule.isOutside) {
      return 'outside';
    } else if (schedule.start) {
      return 'work';
    } else if (schedule.isHoliday) {
      return 'holiday';
    } else if (plan.isHoliday) {
      return 'holiday';
    } else {
      return 'notWork';
    }
  }

  setMemberWork(schedules, setting) {
    let plan = schedules.filter(sch => sch.isPlan === true)[0];
    let work = schedules.filter(sch => sch.isPlan === false)[0];
    let startArr = [
      work? work.start:false, 
      plan? plan.start:false, 
      setting? setting.startTime:false, 
      '09:00'
    ];
    let endArr = [
      work? work.end:false, 
      plan? plan.end:false, 
      setting? setting.endTime:false, 
      '18:00'
    ];

    return {
      status: this.setWorkStatus(work, plan),
      start: startArr.find(start => start),
      end: endArr.find(end => end)
    }
  }

  handleSubmit(event) {
    switch (event) {
      case 'start':
        this.props.workStart();
        break;
      case 'end':
        this.props.workEnd();
        break;
      case 'outside':
        alert('will work');
        break;
      default:
        break;
    }
  }

  render() {
    let alert = null;

    console.log(this.props.error);
    if (this.props.error) {
      alert = <AlertMessage error={this.props.errDetail} />
    } else {
      alert = null;
    }

    return (
      <div>
        <Header />
        <div className="container">
          {alert}
          <MyWorkStatusBox
            status={this.setWorkStatus(this.props.schedule, this.props.plan)}
            name={this.props.name}
            schedule={this.props.schedule}
            plan={this.props.plan}
            onSubmit={this.handleSubmit.bind(this)}
          />
          <WorkStatusExplainBox />
          <div className="Home-memberRow">
            {this.props.users.map((user) => 
              <TeamMemberWorkStatusBox key={user.id}
                name={user.name}
                schedule={this.setMemberWork(user.schedule, user.setting)}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.error.get('error'),
  errDetail: state.error.get('errDetail'),
  name: jwtDecode(localStorage.getItem('access-token')).userName,
  schedule: state.home.get('schedule'),
  users: state.home.get('users')? state.home.get('users'):[],
  plan: state.home.get('plan')
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch(errorActions.resetError()),
  setHome: () => dispatch(homeActions.setHome()),
  workStart: () => dispatch(homeActions.createStart()),
  workEnd: () => dispatch(homeActions.createEnd()),
  getTodayWork: () => dispatch(homeActions.readTodayWork()),
  getTodayPlan: () => dispatch(homeActions.readTodayPlan()),
  getTeamTodayWork: () => dispatch(homeActions.readTeamTodayWork())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);