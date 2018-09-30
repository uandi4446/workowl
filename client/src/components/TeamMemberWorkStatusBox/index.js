/*
* TeamMemberWorkStatusBox
* 다른 팀멤버들의 근무 상태를 표시해주는 Componenet
* 표시 정보 : 이름. 근무상태. 예정퇴근시간
* 실제출근시간, 퇴근시간 표시를 할 지 고민해봐야 할 듯
*/
import React, { Component } from 'react';

import './TeamMemberWorkStatusBox.css';

class TeamMemberWorkStatusBox extends Component {
    render() {
        return (
            <div className="TeamMemberWorkStatusBox">
                <p>{this.props.name}</p>
            </div>
        );
    }
}

TeamMemberWorkStatusBox.defaultProps = {
    name: "bonbon42",
    status: "work",

}

export default TeamMemberWorkStatusBox;