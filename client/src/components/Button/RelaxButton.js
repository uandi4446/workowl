import React, { Component } from 'react';
import './Button.css';

class RelaxButton extends Component {
    render() {
        return (
            <button type={this.props.type} className="RelaxButton btn btn-primary" 
            disabled={this.props.disabled}
            onClick={this.props.onClick}>
                {this.props.title}
            </button>
        );
    }
}

RelaxButton.defaultProps = {
    type: 'button',
    disabled: false,
    title: '',
    onClick: () => {}
}

export default RelaxButton;