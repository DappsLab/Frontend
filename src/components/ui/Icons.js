import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../assets/images/logo.png'
import logoCaption from "../../assets/images/logocaption.png";
import contractImg from "../../assets/images/c3.png";
import custom_contract from "../../assets/images/custom-contract.png";

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
    let bg='';
    if(props.check){
        bg=require('../../assets/images/custom-contract.png')
    }else {
        bg=require('../../assets/images/c3.png')
    }
    return <img src={bg} alt={"contract_image"}
        style={{
            position:"relative",
            top:"-40px",
            borderRadius:"15px",
            width:props.width,
            height:props.height,
            backgroundSize:"cover"
        }}
    />;
};
