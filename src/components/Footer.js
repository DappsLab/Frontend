import React from 'react';
import "../assets/scss/Footer.css"
import logo from "../assets/images/logo.png"
import logoCaption from "../assets/images/logocaption.png"
import {DappsIcon} from "./ui/Icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="">
                <DappsIcon
                    link={true}
                    linkTo="/"
                />
            </div>
        </footer>
    );
};
export default Footer;