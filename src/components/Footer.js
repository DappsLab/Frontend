import React from 'react';
import "../assets/scss/Footer.css"
import {DappsIcon} from "./ui/Icons";
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {
    return (
        <footer className="footer">
            <aside>
                <div>
                    <DappsIcon
                        link={true}
                        linkTo="/"
                    />
                </div>
                <div className="iconContainer">
                    <ul>
                        <li><GitHubIcon/></li>
                        <li><FacebookIcon/></li>
                        <li><TwitterIcon/></li>
                        <li><LinkedInIcon/></li>
                    </ul>
                </div>
                <section className="info">
                    <p className="page-footer__copyright">© Smartz 2018</p>
                    <p>Designed by <a>Qasim Raheem Khokhar</a></p>
                </section>
            </aside>
            <aside>
                <section className="navlist">
                    <ul>
                        <a><li>Smart Contracts</li></a>
                        <a><li>Dapps</li></a>
                        <a><li>Dashboard</li></a>
                        <a><li>Block Explorer</li></a>
                        <a><li>About</li></a>
                        <a><li>Docs</li></a>
                    </ul>
                </section>
                <section>
                    <div>
                        <ul>
                            <li>Get Started</li>
                            <li><a>Tutorials</a></li>
                            <li><a>Help Center</a></li>
                            <li><a>Downloads</a></li>
                            <li><a>Get Your Wallet</a></li>
                            <li><a>BlockChain Explorer</a></li>
                            <li><a>BlockChain Explorer</a></li>
                        </ul>
                    </div>
                    <div></div>
                    <div></div>
                </section>
            </aside>
        </footer>
    );
};
export default Footer;
