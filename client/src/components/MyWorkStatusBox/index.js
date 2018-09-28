/*
* 사용자의 출퇴근 상황과 근무 현황을 알려주는 Component
* 현재 상태에 대한 안내 메시지 : 출근 전. 일하는 중. 퇴근 처리. 외근. 휴가. 반차?
* 퇴근 까지 남은 시간 & 프로그레스 바
* 출근 처리 버튼
* 퇴근 처리 버튼
* 외근 버튼
* > 외근으로 즉출 시 출근 시간 설정에서 기본 출근 시간으로 처리됨
* >> 출근 후 외근 시 퇴근 체크를 못하는 경우 기본 퇴근 시간으로 처리됨
* 반차 시엔 그냥 퇴근 버튼을 일찍 누르거나, 출근 버튼을 늦게 누르는 것으로.
*/

import React, { Component } from 'react';
import './MyWorkStatusBox.css';

import PrimaryButton from '../Button/PrimaryButton.js';
import NormalButton from '../Button/NormalButton.js';

class MyWorkStatusBox extends Component {
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

    render() {
        let status = this.setStatus();
        let startBtn = this.props.status === 'notWork'? false:true;
        let endBtn = this.props.status === 'work'? false:true;

        return (
            <div className="MyWorkStatusBox">
                <h2>{status}</h2>
                <div className="MyWorkStatus-row">
                    <div className="MyWorkStatus left">
                        <PrimaryButton title="출근" disabled={startBtn} />
                    </div>
                    <div className="MyWorkStatus center">
                        <NormalButton title="외근" />
                    </div>
                    <div className="MyWorkStatus right">
                        <PrimaryButton title="퇴근" disabled={endBtn} />
                    </div>
                </div>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: "10%"}}></div>
                </div>
                <div className="MyWorkStatus-hour">
                    <div className="MyWorkStatus-plan left">
                        <span>{!this.props.planStart? "":this.props.planStart}</span>
                    </div>
                    <div className="MyWorkStatus-plan right">
                        <span>{!this.props.planEnd? "":this.props.planEnd}</span>
                    </div>
                </div>
                <div className="MyWorkStatus-hour">
                    <div className="MyWorkStatus-work left">
                        <span>{!this.props.workStart? "":`(${this.props.workStart})`}</span>
                    </div>
                    <div className="MyWorkStatus-work right">
                        <span>{!this.props.workEnd? "":`(${this.props.workEnd})`}</span>
                    </div>
                </div>
            </div>
        );
    }
}

MyWorkStatusBox.defaultProps = {
    status: 'notWork',
    planStart: '09:00',
    planEnd: '18:00',
    workStart: '09:00',
    workEnd: '18:00'
};

export default MyWorkStatusBox;