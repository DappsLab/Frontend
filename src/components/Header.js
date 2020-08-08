import React, {Component} from 'react';
import '../assets/scss/header.css'
import SearchIcon from '@material-ui/icons/Search';
import {Button, ButtonGroup} from '@material-ui/core'
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
                    <nav className="navbar">
                        <ul>
                            <li>HOME</li>
                            <li>SMART CONTRACTS</li>
                            <li>DAPPS</li>
                            <li>DOWNLOADS</li>
                            <li>BLOCK EXPLORER</li>
                            <li>ABOUT US</li>
                            <li>HELP</li>
                        </ul>
                    </nav>
                    <div className="loginContainer">
                        <ButtonGroup variant="contained" color="Primary" aria-label="contained primary button group"
                                     className="loginbtn">
                            <Button>Register</Button>
                            <Button>Login</Button>
                        </ButtonGroup>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;