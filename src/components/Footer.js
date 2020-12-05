import React from 'react';
import "../assets/scss/Footer.css"
import logo from "../assets/images/dappslab-logo-white.png"
import {Icon} from 'semantic-ui-react'


const Footer = () => {
    return (
        <footer className={'flex'}>
            <img src={logo} alt={"logo"}/>
            <div>
                <Icon size={'big'} name={"facebook f"}/>
                <Icon size={'big'}  name={'linkedin'}/>
                <Icon size={'big'} name={"github"}/>
                <Icon size={'big'}  name={'twitter'}/>
            </div>
            <p>© DappsLab 2020</p>
        </footer>
    );
};
export default Footer;

