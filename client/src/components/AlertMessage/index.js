import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

import setAlert from '../../lib/utils/alert';

class AlertMessage extends Component {
  render() {
    return (
      <Alert bsStyle="danger">
        {setAlert(this.props.error)}
      </Alert>
    )
  }
}

export default AlertMessage;