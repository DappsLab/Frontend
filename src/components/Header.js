import React from 'react';
import '../assets/scss/header.css';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react'
import logo from '../assets/images/dappslab-logo-white.png'
import ListItem from "@material-ui/core/ListItem";
import DarkMode from "./ui/Dark-mode";
import {DropDown} from "./ui/DropDown";
import {connect} from 'react-redux';
import {flowRight as compose} from 'lodash';
import Jump from 'react-reveal/Jump';


class Header extends React.Component {
    state = {
        logged:this.props.logged_session,
        currentUser:this.props.currentUser,
    }
    links = [
        {title: 'HOME', linkTo: '/',active:"/"},
        {title: 'SMART CONTRACTS', linkTo: '/smart_contracts',active:"/smart_contracts"},
        {title: 'DAPPS', linkTo: '/dapps',active:"/dapps"},
        {title: 'DOWNLOADS', linkTo: '/downloads',active:"/downloads"},
        {title: 'BLOCK EXPLORER', linkTo: '/block_explorer',active:"/block_explorer"},
        {title: 'ABOUT US', linkTo: '/about_us',active:"/about_us"},
        {title: 'HELP', linkTo: '/help',active:"/help"}
    ];
    link = [
        {title: 'Login', linkTo: '/login'},
        {title: 'Signup', linkTo: '/register'}
    ];
    renderNav = () => (
        this.links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button >
                    {link.title}
                </ListItem>
                {window.location.pathname===link.active&&<div className={"nav_list"}> </div>}
            </Link>
        ))
    );
    renderButtons = () => (
        this.link.map(l => (
            <Link to={l.linkTo} className={"btn_group"} key={l.title}>
                <Button className={` ${l.title==="Signup"&&"Signup_btn"}`}>{l.title}</Button>
            </Link>
        ))
    );
    renderAccount = () => (
        <div>
            <DropDown check={true} user={this.props.currentUser}/>
        </div>
    )

    render() {
        return (
            <div>
                <header className="flex">
                    <Jump>
                        <Link to={'/'}>
                            <img className={'logo'} src={logo} alt={"logo"}/>
                        </Link>
                    </Jump>
                    <nav className="flex">
                        {this.renderNav()}
                    </nav>
                    <div className={"flex "}>
                        {/*<DarkMode/>*/}
                        {this.props.logged_session ?
                            this.renderAccount()
                            : this.renderButtons()
                        }
                    </div>
                </header>
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    logged_session:state.user.logged_session,
    currentUser:state.user.currentUser,
})

export default compose(connect(mapStateToProps))(Header);
