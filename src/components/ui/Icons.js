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
    return <img src={props.imagePath} alt={"contract_image"}
        style={{
            position:props.position,
            top:"-35px",
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
