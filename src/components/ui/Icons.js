import React from 'react';
import {Link} from "react-router-dom";
import '../../assets/scss/SmartContracts.css'
import logo from '../../assets/images/logo.png'
import logoCaption from "../../assets/images/logocaption.png";
import enterprise from "../../assets/images/enterprise-eth.png";

export const DappsIcon = (props) => {
    const template=
        <figure className="logo-container">
            <img src={logo} alt="Logo" className="Logo"/>
            <img src={logoCaption} alt="logo caption" className="LogoCaption"/>
        </figure>
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
            top:"-65px",
            borderRadius:"15px",
            width:props.width,
            height:props.height,
            backgroundSize:"cover"
        }}
    />;
};
export const PeoplesImg = ()=>{
    return <figure className="titleFigure">
        <img src={enterprise} alt={"persons"}/>
    </figure>
}
export const contractImg=()=>{

}
