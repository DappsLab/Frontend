import React from 'react';
import '../assets/scss/header.css';
import {Link} from "react-router-dom";
import {Button, ButtonGroup} from '@material-ui/core'
import {DappsIcon} from "./ui/Icons";
import ListItem from "@material-ui/core/ListItem";
import DarkMode from "./ui/Dark-mode";



const Header =()=>{
    const links=[
        { title:'HOME', linkTo:'/'},
        { title:'SMART CONTRACTS', linkTo:'/smart_contracts'},
        { title:'DAPPS', linkTo:'/dapps'},
        { title:'DOWNLOADS', linkTo:'/downloads'},
        { title:'BLOCK EXPLORER', linkTo:'/block_explorer'},
        { title:'ABOUT US', linkTo:'/about_us'},
        { title:'HELP', linkTo:'/help'}
    ];
    const link=[
        { title:'Register', linkTo:'/register'},
        { title:'Login', linkTo:'/login'}
    ]

    const renderNav =()=>(
        links.map(link=>(
            <Link to={link.linkTo} key={link.title}>
                <ListItem
                    button
                    className={"Nav_item"}
                >
                    {link.title}
                </ListItem>
            </Link>
        ))
    );
    const renderButtons=()=>(
        link.map(l=>(
            <Link to={l.linkTo} key={l.title}>
                <Button variant="contained" color="primary" className="loginbtn">{l.title}</Button>
            </Link>
        ))
    );
    return (
        <div>
            <header className="flex">
                <DappsIcon
                    link={true}
                    linkTo="/"
                />
                <nav className="flex">
                    {renderNav()}
                </nav>
                <div className={"flex"}>
                    {renderButtons()}
                    <DarkMode/>
                </div>
            </header>
        </div>
    );
}

export default Header;
