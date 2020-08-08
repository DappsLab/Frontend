import React, {Component} from 'react';
import logo from '../assets/images/logo.png'
import logoCaption from '../assets/images/logocaption.png'
import '../assets/scss/header.css'
import {DappsIcon} from "./ui/Icons";


class Header extends Component {
    render() {
        return (
            <div>
                <header className="Header">
                   <DappsIcon
                       link={true}
                       linkTo="/"
                   />
                    <nav>

                    </nav>
                    <div>

                    </div>
                </header>
            </div>
        );
    }
}

export default Header;