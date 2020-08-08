import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../assets/images/logo.png'
import logoCaption from "../../assets/images/logocaption.png";


export const DappsIcon = (props) => {
    const template= <div>
        <a href="#">
            <figure className="logo-container">
                <img src={logo} alt="Logo" className="Logo"/>
                <img src={logoCaption} alt="logo caption" className="LogoCaption"/>
            </figure>
        </a>
    </div>;
    if(props.link){
        return(
            <Link to={props.linkTo} className={"link_logo"}>
                {template}
            </Link>
        )
    }else {
        return template
    }
};