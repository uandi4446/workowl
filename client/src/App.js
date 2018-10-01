import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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
          <PrivateRoute path="/logout" component={WillWork} />
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
      localStorage.getItem('access-token') ? (
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