import React, { Component } from 'react';
import './HistoryBox.css';

class HistoryBox extends Component {
    render() {
        return (
            <div className="HistoryBox">
                {this.props.children}
            </div>
        );
    }
}

export default HistoryBox;