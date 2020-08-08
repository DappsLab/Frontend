import React, {Component} from 'react';
import logo from '../assets/images/logo.jpg'
import '../assets/scss/header.css'

class Header extends Component {
    render() {
        return (
            <div>
                <header className="Header">
                    <figure>
                        <img src={logo} alt="Logo" />
                    </figure>
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