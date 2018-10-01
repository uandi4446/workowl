import React, { Component } from 'react';
import './Button.css';

class NormalButton extends Component {
    render() {
        return (
            <button type={this.props.type} name={this.props.name}
            className="NormalButton btn btn-primary" 
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
    name: 'button',
    onClick: () => {}
}

export default NormalButton;