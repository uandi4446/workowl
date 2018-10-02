import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginActions from '../../store/modules/login.js';

import './Login.css';
import AppTitle from '../../components/AppTtile';
import LoginBox from '../../components/LoginBox/LoginBox.js';
import ResetPwdBox from '../../components/LoginBox/ResetPwdBox.js';
import RegisterBox from '../../components/LoginBox/RegisterBox.js';
import AlertMessage from '../../components/AlertMessage';
import setAlert from '../../lib/utils/alert';

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
                return <LoginBox onSubmit={this.handleLogin.bind(this)}/>;
            case 'Forgot':
                return <ResetPwdBox />;
            case 'Register':
                return <RegisterBox onSubmit={this.handleRegister.bind(this)}/>;
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

    // handle actions
    handleLogin(user) {
        this.props.getAuth(user);
    }
    handleRegister(user) {
        this.props.createUser({
            id: user.id,
            pwd: user.pwd,
            name: user.name
        });
    }

    render() {
        let boxContent = this.setBoxContent();
        let commentContent = this.setCommentContent();
        let alert = null;

        if (!this.props.loading) {
        } else if (this.state.content !== 'Login') {
            this.props.setLogin();
            return <Redirect to='/login' />
        } else {
            return <Redirect to='/' />
        }

        if (this.props.error) {
            alert = (<AlertMessage message={setAlert(this.props.errDetail)} />);
        }

        return (
            <div className="Login">
                <div className="Login-img"></div>
                <div className="Login-content">
                    <div className={`${this.state.content}-panel`}>
                        <AppTitle content={this.state.content} />
                    </div>
                    {alert}
                    {boxContent}
                    {commentContent}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.login.get('loading'),
    error: state.login.get('error'),
    errDetail: state.login.get('errDetail').toJS()
});

const mapDispatchToProps = (dispatch) => ({
    getAuth: (user) => dispatch(loginActions.getAuth(user)),
    createUser: (user) => dispatch(loginActions.createUser(user)),
    setLogin: () => dispatch(loginActions.setLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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