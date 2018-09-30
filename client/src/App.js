import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

// Devlepoed import
import Home from './containers/Home/Home.js';
import Login from './containers/Login/Login.js';
import History from './containers/History/History.js';
import WillWork from './containers/WillWork/WillWork.js';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/resetPwd" component={Login} />
          <Route path="/register" component={Login} />
          <Route path="/history" component={History} />
          <Route path="/setup" component={WillWork} />
          <Route path="/logout" component={WillWork} />
        </div>
      </Router>
    );
  }
}

export default App;
