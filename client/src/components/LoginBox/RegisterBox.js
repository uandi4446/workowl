import React, { Component } from 'react';

import './LoginBox.css';
import PrimaryButton from '../Button/PrimaryButton.js';

class RegisterBox extends Component {
    state = {
        id: '',
        name: '',
        mobile: '',
        email: '',
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
            alert('패스워드가 일치하지 않습니다. 다시 입력해 주세요.');
        } else {
            alert('Register');
        }
        console.log(this.state);
        event.preventDefault();
    }


    render() {
        return (
            <div className="LoginBox">
                <div className="panel">
                    <h2>회원 등록</h2>
                    <p>회원 정보를 입력해 주세요.</p>
                </div>
                <form id="Register">
                    <div className="form-group">
                        <input type="text" className="form-control" name="id" placeholder="ID" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="checkPassword" placeholder="Type password again" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="name" placeholder="사용자 이름" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="mobile" placeholder="01000000000" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" name="email" placeholder="test@test.com" onChange={this.handleChange.bind(this)} />
                    </div>
                    <PrimaryButton type="submit" title="회원가입" onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        )
    }
}

export default RegisterBox;