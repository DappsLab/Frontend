import React from 'react';
import "../assets/scss/Footer.css"
import {DappsIcon} from "./ui/Icons";
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Link} from "react-router-dom";



const Footer = () => {
    const icon_links=[
        {icon:<GitHubIcon/> ,LinkTo:"/github"},{icon:<FacebookIcon/>,LinkTo:"/facebook"},
        {icon:<TwitterIcon/>,LinkTo:"/twitter"},{icon:<LinkedInIcon/>,LinkTo:"/linkin"}
    ]
    const nav_links=[
        {title:"Smart Contracts",linkTo:"/smart"},{title:"Dapps",linkTo:"/dapps"},
        {title:"Dashboard",linkTo:"/dashboard"},{title:"Block Explorer",linkTo:"/block"},
        {title:"About",linkTo:"/about"},{title:"Docs",linkTo:"/docs"}
    ]
    const bottom_links=[
        {title:"Privacy policy"},{title:"Terms & conditions"},{title:"Technical Whitepaper"}
    ]
    const  renderIcon=()=>(
        icon_links.map(link=>(
            <li  key={link.LinkTo}>
                <Link to={link.LinkTo}>{link.icon}</Link>
            </li>
        ))
    );
    const renderNav=()=>(
        nav_links.map(link=>(
            <Link to={link.linkTo} key={link.linkTo}>
                <li>{link.title}</li>
            </Link>
        ))
    );
    const renderBottom=()=>(
        bottom_links.map(link=>(
            <li  key={link.title}>
                <Link to={""}>{link.title}</Link>
            </li>
        ))
    )
    return (
        <footer>
            <aside>
                <div>
                    <DappsIcon/>
                </div>
                <div className="iconContainer">
                    <ul>
                        {renderIcon()}
                    </ul>
                </div>
                <section className="info">
                    <p className="page-footer__copyright">© DappsLab2020</p>
                    <p>Designed by <a href="#/">DappsLab team</a></p>
                </section>
            </aside>
            <aside>
                <section className="navlist">
                    <ul>{renderNav()}</ul>
                </section>
                <section className="extras">
                    {/*<div>*/}
                    {/*    <ul>*/}
                    {/*        <li className="heading">GET STARTED</li>*/}
                    {/*        <li><a>Tutorials</a></li>*/}
                    {/*        <li><a>Help Center</a></li>*/}
                    {/*        <li><a>Downloads</a></li>*/}
                    {/*        <li><a>Get Your Wallet</a></li>*/}
                    {/*        <li><a>BlockChain Explorer</a></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <ul>*/}
                    {/*        <li className="heading">DAPPSLAB</li>*/}
                    {/*        <li><a>About Us</a></li>*/}
                    {/*        <li><a>News</a></li>*/}
                    {/*        <li><a>Events</a></li>*/}
                    {/*        <li><a>Dapps</a></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <ul>*/}
                    {/*        <li className="heading">LEGAL</li>*/}
                    {/*        <li><a>Privacy Policy</a></li>*/}
                    {/*        <li><a>Term of Use</a></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    <div>
                        We do not store your private keys, passwords or your cryptocurrency.
                        Dappslab is just a provider to conclude a smart contract.
                    </div>
                    <div>
                        <ul>{renderBottom()}</ul>
                    </div>
                </section>
            </aside>
        </footer>
    );
};
export default Footer;

