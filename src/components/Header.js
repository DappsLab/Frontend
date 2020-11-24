import React from 'react';
import '../assets/scss/header.css';
import {Link} from "react-router-dom";
import {Button} from '@material-ui/core'
import {DappsIcon} from "./ui/Icons";
import ListItem from "@material-ui/core/ListItem";
import DarkMode from "./ui/Dark-mode";
import {DropDown} from "./ui/DropDown";
import {connect} from 'react-redux';
import {flowRight as compose} from 'lodash';
import Jump from 'react-reveal/Jump';


class Header extends React.Component {
    state = {
        logged:null,
        currentUser:null,
        count:0
    }
    links = [
        {title: 'HOME', linkTo: '/'},
        {title: 'SMART CONTRACTS', linkTo: '/smart_contracts'},
        {title: 'DAPPS', linkTo: '/dapps'},
        {title: 'DOWNLOADS', linkTo: '/downloads'},
        {title: 'BLOCK EXPLORER', linkTo: '/block_explorer'},
        {title: 'ABOUT US', linkTo: '/about_us'},
        {title: 'HELP', linkTo: '/help'}
    ];
    link = [
        {title: 'Register', linkTo: '/register'},
        {title: 'Login', linkTo: '/login'}
    ];
    componentDidMount() {
        if (this.props.currentUser) {
            this.setState({
                logged: this.props.logged_session, currentUser: this.props.currentUser
            });

        }
    }

    renderNav = () => (
        this.links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button>
                    {link.title}
                </ListItem>
            </Link>
        ))
    );
    renderButtons = () => (
        this.link.map(l => (
            <Link to={l.linkTo} key={l.title}>
                <Button variant="contained" color="primary" className="loginbtn">{l.title}</Button>
            </Link>
        ))
    );
    renderAccount = () => (
        <div>
            <DropDown check={true} user={this.state.currentUser}/>
        </div>
    )
    render() {
        return (
            <div>
                <header className="flex">
                    <Jump>
                        <DappsIcon link={true} linkTo="/"/>
                    </Jump>
                    <nav className="flex">
                        {this.renderNav()}
                    </nav>
                    <div className={"flex"}>
                        <DarkMode/>
                        {this.state.logged ?
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
