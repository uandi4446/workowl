/*
* History Container
* 출퇴근 이력을 보여주는 페이지
* 날짜별 출근 / 퇴근 시간
* 예정 출근 / 퇴근 시간보다 +/- 된 시간
* 한달 단위로 이력을 표시
* Order : 날짜. 출근시간. 퇴근시간. 
* 
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import './History.css';

import * as errorActions from '../../store/modules/error.js';
import * as historyActions from '../../store/modules/history.js';

import HistoryBox from '../../components/HistoryBox';
import MonthCheckRow from '../../components/MonthCheckRow';
import HistoryTable from '../../components/HistoryTable';

import Header from '../../components/Header';

class History extends Component {
    // 연도를 고려하지 않은 코드
    // 연도가 넘어갈 때를 생각하여, 기준 날짜를 state로 정하는 것이 좋을 듯
    state = {
        date: moment().format('YYYY-MM-DD'),
    };

    componentDidMount() {
        let data = {
            userId: jwtDecode(localStorage.getItem('access-token')).userId,
            date: this.state.date
        }
        console.log(data);
        this.props.readHistory(data);
    }

    handleChangeMonth(date) {
        this.setState({
            date: date
        });
    }

    setSchedules() {
        let data = {};
        let defaultData = {
            planStart: '',
            start: '',
            planEnd: '',
            end: ''
        };

        let schedules = this.props.schedules? this.props.schedules.schedule:[];
        let setting = this.props.schedules? this.props.schedules.setting:{};

        let plan = schedules.filter(sch => sch.isPlan === true);
        let work = schedules.filter(sch => sch.isPlan === false);

        plan.map((p) => {
            data[p.date] = data[p.date]? data[p.date]:defaultData;

            data[p.date].planStart = p.start? p.start:(setting? setting.start:'09:00');
            data[p.date].planEnd = p.end? p.end:(setting? setting.end:'18:00');
        });

        work.map((w) => {
            data[w.date] = data[w.date]? ({
                planStart: data[w.date].planStart? data[w.date].planStart:(setting? setting.start:'09:00'),
                start: w.start? w.start:'',
                planEnd: data[w.date].planEnd? data[w.date].planEnd:(setting? setting.end:'18:00'),
                end: w.end? w.end:''
            }):({
                planStart: setting? setting.start:'09:00',
                start: w.start? w.start:'',
                planEnd: setting? setting.end:'18:00',
                end: w.end? w.end:''
            });

            data[w.date].start = w.start? w.start:'';
            data[w.date].end = w.end? w.end:'';
        });

        console.log(data);
    }

    render() {
        return (
            <div>
               <Header />
               <div className="container">
                    <HistoryBox>
                        <MonthCheckRow 
                            date={this.state.date}
                            onChangeMonth={this.handleChangeMonth.bind(this)}
                        />
                        <HistoryTable 
                            schedules={this.setSchedules()}
                        />
                    </HistoryBox>
               </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.error.get('error'),
    errDetail: state.error.get('errDetail'),
    schedules: state.history.get('schedules')
  });
  
  const mapDispatchToProps = (dispatch) => ({
    resetError: () => dispatch(errorActions.resetError()),
    resetHistory: () => dispatch(historyActions.setHistory()),
    readHistory: (data) => dispatch(historyActions.readHistory(data))
  });

export default connect(mapStateToProps, mapDispatchToProps)(History);
