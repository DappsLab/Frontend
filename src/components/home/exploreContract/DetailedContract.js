import React, {Component} from 'react';
 import  '../../../assets/scss/detailed_contract.css';
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import RadioButtons from "../../ui/RadioButton";



class  DetailedContract extends Component{
    render() {

        return (
            <div className={"contractContainer flex"}>
                <Fade top delay={300}>
                    <div className={"contractLeft"}>
                    </div>
                </Fade>
                <Fade top delay={300}>
                    <div className={"contractRight"}>
                        <h3 className={"buy-top"}><span>Buy</span></h3>
                        <div className={"flex"}><FontAwesomeIcon className={"checkCircle"} icon={faCheckCircle}/>
                            <p>Reviewed by Dappslab</p></div>
                        <h4>Price</h4>
                        <div>
                            <RadioButtons/>
                        </div>
                    </div>
                </Fade>
            </div>
        );
    }
}
export default DetailedContract
