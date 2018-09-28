import React, { Component } from 'react';
import './LoginBox.css';

import PrimaryButton from '../Button/PrimaryButton.js';

class LoginBox extends Component {
    state = {
        id: '',
        password: ''
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        alert('Login');
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div className="LoginBox">
                <div className="panel">
                    <h2>사용자 로그인</h2>
                    <p>아이디와 패스워드를 입력하세요.</p>
                </div>
                <form id="Login">
                    <div className="form-group">
                        <input type="text" className="form-control" name="id" placeholder="ID" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange.bind(this)} />
                    </div>
                    <PrimaryButton type="submit" title="Login" onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        );
    }
}

export default LoginBox;