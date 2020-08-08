import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../assets/images/logo.png'
import logoCaption from "../../assets/images/logocaption.png";
import contractImg from "../../assets/images/c3.png";

export const DappsIcon = (props) => {
    const template=
        <a href="#">
            <figure className="logo-container">
                <img src={logo} alt="Logo" className="Logo"/>
                <img src={logoCaption} alt="logo caption" className="LogoCaption"/>
            </figure>
        </a>;
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
export  const ContractImg = (props) => {
    return <div
        style={{
            width:props.width,
            height:props.height,
            background:`url(${contractImg})`,
            backgroundSize:"cover"
        }}
    >
    </div>;
};