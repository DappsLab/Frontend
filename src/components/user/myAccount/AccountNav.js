import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import "../../../assets/scss/account_nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt,faUser,faBalanceScale,faExchangeAlt ,faLock} from '@fortawesome/free-solid-svg-icons'

class AccountNav extends Component {
    render() {
        const links=[
            {icon:faUser,title:'Profile',subtitle:"Account setting",linkTo:'/account/profile'},
            {icon:faBalanceScale,title:'Deposit & Withdraw',subtitle:"Withdraw or deposit balance from/to your account",linkTo:'/account/profile/wallet'},
            {icon:faExchangeAlt,title:'Transaction',subtitle:"View your transaction history",linkTo:'/account/profile/transactions'},
            {icon:faLock,title:'2AF',subtitle:"Enable your 2-Factor Authentication.",linkTo:'/account/profile/2fa'},
            {icon:faSignOutAlt,title:'Layout',subtitle:"Sign Out",linkTo:'/logout'}
        ];
        const style={
            fontWeight: '300',
            borderBottom:'1px solid #353535',
            display:'flex',
            marginBottom:"10px"
        };
        const renderNavItem =()=>(
            links.map(link=>(
                <Link to={link.linkTo} key={link.title}>
                    <ListItem
                        button
                        style={style}
                    >
                        <div className={"icon_box flex"}><FontAwesomeIcon icon={link.icon}/></div>
                        <div className={"flex nav_text"}>
                            <h4>{link.title}</h4>
                            <span>{link.subtitle}</span>
                        </div>
                    </ListItem>
                </Link>
            ))
        );
        return (
            <div>
                {renderNavItem()}
            </div>
        );
    }
}

export default AccountNav;
