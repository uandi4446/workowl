/*
* 사용자의 출퇴근 상황과 근무 현황을 알려주는 Component
* 현재 상태에 대한 안내 메시지 : 출근 전. 일하는 중. 퇴근 처리. 외근. 휴가. 반차?
* notWork / work / finish / outside / holiday
* 퇴근 까지 남은 시간 & 프로그레스 바
* > 퇴근 까지 남은 시간 프로그레스 바는 퇴근까지 남은시간 / 하루 근무시간 으로 한다.
* > 하루 근무시간은 예정 출근 시간을 기준으로 한다.
* 출근 처리 버튼
* 퇴근 처리 버튼
* 외근 버튼
* > 외근으로 즉출 시 출근 시간 설정에서 기본 출근 시간으로 처리됨
* >> 출근 후 외근 시 퇴근 체크를 못하는 경우 기본 퇴근 시간으로 처리됨
* 반차 시엔 그냥 퇴근 버튼을 일찍 누르거나, 출근 버튼을 늦게 누르는 것으로.
*/

import React, { Component } from 'react';
import moment from 'moment';
import './MyWorkStatusBox.css';

import PrimaryButton from '../Button/PrimaryButton.js';
import NormalButton from '../Button/NormalButton.js';
import RelaxButton from '../Button/RelaxButton.js';
import StatusIcon from '../StatusIcon';

class MyWorkStatusBox extends Component {
    constructor(props) {
        super(props);
        moment.locale('ko', {
            weekdays: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
            weekdaysShort: ["일","월","화","수","목","금","토"]
        });
    }

    setStatus() {
        switch (this.props.status) {
            case 'notWork':
                return '출근 버튼을 눌러주세요.';
            case 'work':
                return '열심히 일하는 중. 퇴근이 멀지 않았어요!';
            case 'finish':
                return '퇴근 처리 되었습니다.';
            case 'outside':
                return '외근 중입니다.';
            case 'holiday':
                return '오늘은 휴가입니다. 왜 여기 계시죠?'
            default:
                return '';
        }
    }

    setProgress() {
        if (this.props.status === 'notWork' || this.props.status === 'holiday') {
            return { width: '0%' };
        } else if (this.props.status === 'finish') {
            return { width : '100%' };
        } else {
            let start = moment(this.props.plan.start, 'HH:mm');
            let end = this.props.schedule.end?
                        moment(this.props.schedule.end, 'HH:mm'):
                        moment(this.props.plan.end, 'HH:mm');
            let workTime = moment.duration(end.diff(start)).asMilliseconds();
            let remainTime = moment.duration(end.diff(moment())).asMilliseconds();
            let workPer = Math.round((1 - remainTime/workTime) * 100);
            return {
                width: `${workPer}%`
            };
        }
    }

    // handle button click
    onStartSubmit(event) {
        this.props.onSubmit('start');
        event.preventDefault();
    }
    onEndSubmit(event) {
        this.props.onSubmit('end');
        event.preventDefault();
    }
    onOutSubmit(event) {
        this.props.onSubmit('outside');
        event.preventDefault();
    }

    render() {
        let status = this.setStatus();
        let startBtn = this.props.status === 'notWork'? false:true;
        let endBtn = this.props.status === 'work'? false:true;
        let outBtn = this.props.status === 'finish'? true:false;
        let progressStyle = this.setProgress();

        return (
            <div className="MyWorkStatusBox">
                <div className="textleft">
                    <StatusIcon status={this.props.status} size="small"/>
                    <div className="MyWorkStatusBox-name">{this.props.name}님 {`(${moment().format('YYYY-MM-DD. ddd')})`}</div>
                </div>
                <h2>{status}</h2>
                <div className="MyWorkStatus-row">
                    <div className="MyWorkStatus left">
                        <PrimaryButton title="출근" 
                            disabled={startBtn} 
                            onClick={this.onStartSubmit.bind(this)}
                        />
                    </div>
                    <div className="MyWorkStatus center">
                        <NormalButton title="외근" 
                            disabled={outBtn}
                            onClick={this.onOutSubmit.bind(this)}
                        />
                    </div>
                    <div className="MyWorkStatus right">
                        <RelaxButton title="퇴근" 
                            disabled={endBtn} 
                            onClick={this.onEndSubmit.bind(this)}
                        />
                    </div>
                </div>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-info" 
                        role="progressbar" 
                        style={progressStyle}
                    ></div>
                </div>
                <div className="MyWorkStatus-hour">
                    <div className="MyWorkStatus-work left">
                        <span>{!this.props.schedule.start? "":this.props.schedule.start}</span>
                    </div>
                    <div className="MyWorkStatus-work right">
                        <span>{!this.props.schedule.end? "":this.props.schedule.end}</span>
                    </div>
                </div>
                <div className="MyWorkStatus-hour">
                    <div className="MyWorkStatus-plan left">
                        <span>{!this.props.plan.start? "()":`(${this.props.plan.start})`}</span>
                    </div>
                    <div className="MyWorkStatus-plan right">
                        <span>{!this.props.plan.end? "()":`(${this.props.plan.end})`}</span>
                    </div>
                </div>
            </div>
        );
    }
}

MyWorkStatusBox.defaultProps = {
    status: 'notWork',
    name: '문혜선',
    schedule: {
        start: '09:00',
        end: '18:00' 
    },
    plan: {
        start: '09:00',
        end: '18:00'
    }
};

export default MyWorkStatusBox;