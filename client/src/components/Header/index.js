import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';

import './Header.css';

import AppTitle from '../AppTtile';

class Header extends Component {
    state = {
        activeKey: 1
    }

    handleSelect(selectedKey) {
        this.setState({
            activeKey: selectedKey
        })
    }

    render() {
        return (
            <header className="Header">
                <Link to="/"><AppTitle content="Header"/></Link>
                <div className="Header-nav">
                    <Nav
                        bsStyle="pills"
                        justified
                        activeKey={this.state.activeKey}
                        onSelect={key => this.handleSelect(key)}
                    >
                        <NavItem eventKey={1} href="/">
                            홈
                        </NavItem>
                        <NavItem eventKey={2} href="/history">
                            이력
                        </NavItem>
                        <NavItem eventKey={3} href="/setup">
                            설정 
                        </NavItem>
                        <NavItem eventKey={4} href="/logout">
                            로그아웃
                        </NavItem>
                    </Nav>
                </div>
            </header>
        )
    }
}

export default Header;