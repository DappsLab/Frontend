import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import {DappsIcon} from "../ui/Icons";


class Header extends Component {
    render() {
        return (
            <AppBar
                position={"fixed"}
                style={{
                    backgroundColor:'#98c5e9',
                    backgroundPosition:'center',
                    boxShadow:'none',
                    padding:'10px 0',
                    borderBottom:'2px solid #000285e'
                }}
            >
                <Toolbar style={{
                    display:'flex'
                }}>
                    <div style={{flexGrow:1}}>
                        <div className={"header_logo"}>
                            <DappsIcon
                                link={true}
                                linkTo="/"
                                height={"70px"}
                                width={"70px"}
                            />
                        </div>
                    </div>
                    <Link to={"/login"}>
                        <Button color={"inherit"}>Login</Button>
                    </Link>
                    <Link to={"/register"}>
                        <Button color={"inherit"}>Register</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;