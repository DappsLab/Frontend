import React, {Component} from 'react';
import logo from '../assets/images/logo.png'
import logoCaption from '../assets/images/logocaption.png'
import '../assets/scss/header.css'


class Header extends Component {
    render() {
        return (
            <div>
                <header className="Header">
                    <a href="#">
                        <figure className="logo-container">
                            <img src={logo} alt="Logo" className="Logo"/>
                            <img src={logoCaption} alt="logo caption" className="LogoCaption"/>
                        </figure>
                    </a>
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