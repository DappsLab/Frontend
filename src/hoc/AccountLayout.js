import React from 'react';
import Layout from "./Layout";
import '../assets/scss/account_layout.css'
import AccountNav from "../components/ui/AccountNav";


const AccountLayout = (props) => {

    return (
        <Layout>
            <div className={'account_container '}>
                <div className={'account_left'}>
                    <AccountNav {...props}/>
                </div>
                <div className={'account_right'}>
                    {props.children}
                </div>
            </div>
        </Layout>
    );
};

export default AccountLayout;