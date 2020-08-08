import React from 'react';
import '../assets/scss/header.css';
import {Link} from "react-router-dom";
// import SearchIcon from '@material-ui/icons/Search';
import {Button, ButtonGroup} from '@material-ui/core'
import {DappsIcon} from "./ui/Icons";
import ListItem from "@material-ui/core/ListItem";


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
    // function  addBackground(e){
    //     e.target.style.background = 'red';
    // }
    // function  removeBackground(e){
    //     e.target.style.background = '#1b2c3d';
    // }
    const renderNav =()=>(
        links.map(link=>(
            <Link to={link.linkTo} key={link.title}>
                <ListItem
                    button
                    className={"Nav_item"}
                    // onMouseOver={addBackground}
                    // onMouseLeave={removeBackground}
                >
                    {link.title}
                </ListItem>
            </Link>
        ))
    );
    const renderButtons=()=>(
        link.map(l=>(
            <Link to={l.linkTo} key={l.title}>
                <ButtonGroup variant="contained" color="Primary" aria-label="contained primary button group"
                             className="loginbtn">
                    <Button>{l.title}</Button>
                </ButtonGroup>
            </Link>
        ))
    );
    return (
        <div>
            <header className="Header">
                <DappsIcon
                    link={true}
                    linkTo="/"
                />
                <nav className="navbar">
                    {renderNav()}
                </nav>
                <div className="loginContainer">
                    {renderButtons()}

                </div>
            </header>
        </div>
    );
}

export default Header;