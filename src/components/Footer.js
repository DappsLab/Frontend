import React from 'react';
import "../assets/scss/Footer.css"
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
