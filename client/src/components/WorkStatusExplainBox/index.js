/* WorkStatusExplainBox
* 현재 상태에 따라 상태 아이콘의 색깔이 다르게 표시됨
* 색깔 별 현재 상태를 설명하기 위한 Component
*/

import React, { Component } from 'react';

import './WorkStatusExplainBox.css';
import StatusIcon from '../StatusIcon';

class WorkStatusExplainBox extends Component {
    render() {
        return (
            <div className="WorkStatusExplainBox">
                <div className="WorkStatusExplainBox-box">
                    <StatusIcon status="notWork" size="small" />
                    <div className="WorkStatusExplainBox-text">출근 전</div>
                </div>
                <div className="WorkStatusExplainBox-box">
                    <StatusIcon status="work" size="small" />
                    <div className="WorkStatusExplainBox-text">근무 중</div>
                </div>
                    <div className="WorkStatusExplainBox-box">
                    <StatusIcon status="finish" size="small" />
                <div className="WorkStatusExplainBox-text">퇴근</div>
                </div>
                    <div className="WorkStatusExplainBox-box">
                    <StatusIcon status="outside" size="small" />
                <div className="WorkStatusExplainBox-text">외근 중</div>
                </div>
                <div className="WorkStatusExplainBox-box">
                    <StatusIcon status="holiday" size="small" />
                    <div className="WorkStatusExplainBox-text">휴가</div>
                </div>
            </div>
        );
    }
}

export default WorkStatusExplainBox ;