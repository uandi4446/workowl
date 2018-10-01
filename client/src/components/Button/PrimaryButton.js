import React, { Component } from 'react';
import './Button.css';

class PrimaryButton extends Component {
    render() {
        return (
            <button type={this.props.type} name={this.props.name}
            className="PrimaryButton btn btn-primary" 
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
    name: 'button',
    onClick: () => {}
}

export default PrimaryButton;