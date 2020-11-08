import React, { Component} from 'react';
import AccountNav from "../components/user/myAccount/AccountNav";
import "../assets/scss/upload_section.css"
import "../assets/scss/account_layout.css"
import Layout from "./Layout";
import {connect} from "react-redux";



class AccountLayout extends Component {

    renderBanner = () => (
        <section className={"account_welcome"}>
            <h2>Welcome back, <span>{this.props.currentUser}</span></h2>
            <p>You can manage your account, preferences, and much more using our unified login system</p>
        </section>
    )

    render() {
        return (
            <Layout>
                {this.renderBanner()}
                <div className={"account_container flex"}>
                    <div className={"account_nav"}>
                        <AccountNav/>
                    </div>
                    <div className={"account_right"}>
                        {this.props.children}
                    </div>
                </div>
            </Layout>
        );
    };
}

const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser.fullName
});
export default connect(mapStateToProps)(AccountLayout);
