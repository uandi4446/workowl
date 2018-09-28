import React, { Component } from 'react';
import './Button.css';

class PrimaryButton extends Component {
    render() {
        return (
            <button type={this.props.type} className="PrimaryButton btn btn-primary" 
            disabled={this.props.disabled}
            onClick={this.props.onClick}>
                {this.props.title}
            </button>
        );
    }
}

PrimaryButton.defaultProps = {
    type: 'button',
    disabled: false,
    title: '',
    onClick: () => {}
}

export default PrimaryButton;