import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class AlertMessage extends Component {
  render() {
    return (
      <Alert bsStyle="danger">
        {this.props.message}
      </Alert>
    )
  }
}

export default AlertMessage;