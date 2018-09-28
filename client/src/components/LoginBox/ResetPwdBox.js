import React, { Component } from 'react';

import './LoginBox.css';
import PrimaryButton from '../Button/PrimaryButton.js';

class ResetPwdBox extends Component {
    state = {
        id: '',
        mobile: '',
        password: '',
        checkPassword: ''
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        if (this.state.password !== this.state.checkPassword) {
            alert('패스워드가 일치하지 않습니다. 다시 입력해 주세요.')
        } else {
            alert('Reset Password');
        }
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div className="LoginBox">
                <div className="panel">
                    <h2>패스워드 초기화</h2>
                </div>
                <form id="ResetPwd">
                    <div className="form-group">
                        <input type="text" className="form-control" name="id" placeholder="ID" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="mobile" placeholder="01000000000" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="New Password" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="checkPassword" placeholder="Type again new password" onChange={this.handleChange.bind(this)} />
                    </div>
                    <PrimaryButton type="submit" onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        );
    }
}

export default ResetPwdBox;