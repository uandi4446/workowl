/*
* TeamMemberWorkStatusBox
* 다른 팀멤버들의 근무 상태를 표시해주는 Componenet
* 표시 정보 : 이름. 근무상태. 예정퇴근시간
* 실제출근시간, 퇴근시간 표시를 할 지 고민해봐야 할 듯
*/
import React, { Component } from 'react';

import './TeamMemberWorkStatusBox.css';
import StatusIcon from '../StatusIcon';

class TeamMemberWorkStatusBox extends Component {
    setContent() {
        switch (this.props.status) {
            case 'notWork':
            case 'work':
            case 'finish':
                return [ 
                    <div className="TeamMemberWorkStatusBox-text">
                        출근시간: {this.props.workStart? this.props.workStart:this.props.planStart}
                    </div>,
                    <div></div>,
                    <div className="TeamMemberWorkStatusBox-text">
                        퇴근시간: {this.props.workEnd? this.props.workEnd:this.props.planEnd}
                    </div>
                ];
            default:
                return null;
        }
    }
    render() {
        let content = this.setContent();
        return (
            <div className="TeamMemberWorkStatusBox">
                <div>
                    <StatusIcon status={this.props.status} size="small"/>
                    <div className="TeamMemberWorkStatusBox-text">{this.props.name}</div>
                </div>
                {content}
            </div>
        );
    }
}

TeamMemberWorkStatusBox.defaultProps = {
    name: 'bonbon42',
    status: 'work',
    planStart: '09:00',
    planEnd: '18:00'

}

export default TeamMemberWorkStatusBox;