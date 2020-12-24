import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBalanceScale, faExchangeAlt, faLock, faSignOutAlt, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";


const AccountNav=(props)=>{

    const NavLinks=[
        {icon:faUser,title:'Profile',subtitle:"Account setting",link:"/account_settings/profile"},
        {icon:faTasks,title:'KYC',subtitle:"Account Verification",link:"/account_settings/KYC"},
        {icon:faBalanceScale,title:'Deposit & Withdraw',subtitle:"Withdraw or deposit balance from/to your account",link:"/account_settings/withdraw&deposite"},
        {icon:faExchangeAlt,title:'Transaction',subtitle:"View your transaction history",link:"/account_settings/transaction"},
        {icon:faLock,title:'2FA',subtitle:"Enable your 2-Factor Authentication.",link:"/account_settings/2fa"},
        {icon:faSignOutAlt,title:'Logout',subtitle:"Sign Out",link:"/logout"},
    ]

    return NavLinks.map(nav=>{
            return <div key={nav.title} className={'flex items_container'}>
                    <div className={"account_item cursor flex"} onClick={()=>props.history.push(nav.link)} >
                    <div className={`icon_box flex ${nav.link===window.location.pathname?"meadow-color":""} ${nav.title==="Logout"? "brown-color":""}`}><FontAwesomeIcon  icon={nav.icon}/></div>
                    <div className={"flex nav_text"}>
                        <h4>{nav.title}</h4>
                        <span>{nav.subtitle}</span>
                    </div>
                </div>
                        <div className={'flex square_container'}>
                            <div className={`square ${nav.title==="Logout"? "brown-color":""} ${nav.link===window.location.pathname?"meadow-color":""}`}> </div>
                        </div>
            </div>
    }
    )
}

export default AccountNav