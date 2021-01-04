import React from 'react';
import '../../assets/scss/SmartContracts.css'

import enterprise from "../../assets/images/enterprise-eth.png";



export  const ContractImg = (props) => {
    return <img src={props.imagePath} alt={"contract_image"}
        style={{
            position:props.position,
            right:"60px",
            borderRadius:"15px",
            width:props.width,
            height:props.height,
            backgroundSize:"cover",
            marginRight:props.margin? props.margin:""
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
