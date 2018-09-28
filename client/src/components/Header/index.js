import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import AppTitle from '../AppTtile';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <Link to="/"><AppTitle content="Header"/></Link>
            </header>
        )
    }
}

export default Header;