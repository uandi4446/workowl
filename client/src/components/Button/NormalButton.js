import React, { Component } from 'react';
import './Button.css';

class NormalButton extends Component {
    render() {
        return (
            <button type={this.props.type} className="NormalButton btn btn-primary" 
            disabled={this.props.disabled}
            onClick={this.props.onClick}>
                {this.props.title}
            </button>
        );
    }
}

NormalButton.defaultProps = {
    type: 'button',
    disabled: false,
    title: '',
    onClick: () => {}
}

export default NormalButton;