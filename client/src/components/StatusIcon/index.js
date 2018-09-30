import React, { Component } from 'react';

import './StatusIcon.css';

class StatusIcon extends Component {
    render() {
        return (
            <div className={`StatusIcon ${this.props.status} ${this.props.size}`}>
            </div>
        );
    }
}

StatusIcon.defaultProps = {
    status: 'work',
    size: 'middle'
}

export default StatusIcon;