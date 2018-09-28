import React, { Component } from 'react';

import './AppTitle.css';
import WelcomLogoB from '../../lib/images/welcom_workowl_logo_black.png';
import WelcomLogoW from '../../lib/images/welcom_workowl_logo_white.png';
import LogoB1 from '../../lib/images/workowl_logo_black.png';
import LogoB2 from '../../lib/images/workowl_logo_black_2.png';
import LogoW1 from '../../lib/images/workowl_logo_white.png';
import LogoW2 from '../../lib/images/workowl_logo_white_2.png';

class AppTitle extends Component {
    setTitle() {
        switch (this.props.content) {
            case 'Header':
                return LogoW1;
            default:
                return WelcomLogoW;
        }
    }

    render() {
        let logo = this.setTitle();
        return (
            <img src={logo} className={`${this.props.content}-title`}/> 
        );
    }
}

export default AppTitle;