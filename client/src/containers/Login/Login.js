import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import AppTitle from '../../components/AppTtile';
import LoginBox from '../../components/LoginBox/LoginBox.js';
import ResetPwdBox from '../../components/LoginBox/ResetPwdBox.js';
import RegisterBox from '../../components/LoginBox/RegisterBox.js';

class Login extends Component {
    constructor(props) {
        super(props);
        let content = this.setContent(this.props.match.path);

        this.state = {
            content: content
        };
    }

    setContent(path) {
        switch (path) {
            case '/login':
                return 'Login';
            case '/resetPwd':
                return 'Forgot';
            case '/register':
                return 'Register';
            default:
                return '';
        }
    }

    setBoxContent() {
        switch (this.state.content) {
            case 'Login':
                return <LoginBox />;
            case 'Forgot':
                return <ResetPwdBox />;
            case 'Register':
                return <RegisterBox />;
            default:
                return null;
        }
    }

    setCommentContent() {
        switch (this.state.content) {
            case 'Login':
                return [
                    <Forgot />,
                    <Register />
                ];
            case 'Forgot':
                return <Register />;
            default:
                return null;
        }
    }

    render() {
        let boxContent = this.setBoxContent();
        let commentContent = this.setCommentContent();

        return (
            <div className="Login">
                <div className="Login-img"></div>
                <div className="Login-content">
                    <div className={`${this.state.content}-panel`}>
                        <AppTitle content={this.state.content} />
                    </div>
                    {boxContent}
                    {commentContent}
                </div>
            </div>
        );
    }
}

const Forgot = () => {
    return (
        <div className="Login-link">
            <Link to="/resetPwd">비밀번호를 잊으셨나요?</Link>
        </div>
    )
}

const Register = () => {
    return (
        <div className="Login-link">
            <Link to ="/register">계정이 없으신가요?</Link>
        </div>
    );
}

export default Login;