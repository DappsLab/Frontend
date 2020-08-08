import React, {Component} from 'react';
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