import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import './App.css';

// Devlepoed import
import Home from './containers/Home/Home.js';
import Login from './containers/Login/Login.js';
import History from './containers/History/History.js';
import WillWork from './containers/WillWork/WillWork.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/resetPwd" component={Login} />
          <Route path="/register" component={Login} />
          <PrivateRoute path="/history" component={History} />
          <PrivateRoute path="/setup" component={WillWork} />
          <PrivateRoute path="/logout" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      verifyToken() ? (
        <Component {...props} />
      ) : ( 
        <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }} />
      )
    }
  />
);

const verifyToken = () => {
  // token 이 없는 경우
  if (!localStorage.getItem('access-token')) {
    return false;
  }

  let token = jwtDecode(localStorage.getItem('access-token'));

  // token 유효기간이 지난 경우
  if (moment().isAfter(token.expiredTime)) {
    localStorage.removeItem('access-token');
    return false;
  }

  return true;

}