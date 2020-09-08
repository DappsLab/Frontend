import React from 'react';
import AccountNav from "../components/user/myAccount/AccountNav";
import "../assets/scss/upload_smart_contract.css"
import "../assets/scss/account_layout.css"
import Layout from "./Layout";

const AccountLayout = (props) => {
    const  renderBanner=()=>(
        <section className={"account_welcome"}>
            <h2>Welcome back, <span>Username</span></h2>
            <p>You can manage your account, preferences, and much more using our unified login system</p>
        </section>
    )
    return (
        <Layout>
            {renderBanner()}
            <div className={"account_container flex"}>
                <div className={"account_nav"}>
                    <AccountNav/>
                </div>
                <div className={"account_right"}>
                    {props.children}
                </div>
            </div>
        </Layout>
    );
};

export default AccountLayout;
