import React, { Component} from 'react';
import "../../../assets/scss/upload_section.css"
import "../../../assets/scss/account_layout.css"
import Layout from "../../../hoc/Layout";
import {connect} from "react-redux";
import {Tab, Menu, Grid} from "semantic-ui-react"
import GeneralSetting from "./GeneralSetting";
import {Account} from "../../ui/AccountNav";
import {faBalanceScale,faTasks, faExchangeAlt, faLock, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import WithdrawDeposite from "./WithdrawDeposite";
import TwoFA from "./TwoFA";
import Logout from "./Logout";
import Transactions from "./Transactions";
import Kyc from "./KYC";

class UserAccount extends Component {
    state={
        currentUser:this.props.user===null?this.props.currentUser:this.props.user
    }
    renderBanner = () => (
        <section className={"account_welcome"}>
            <h2>Welcome back, <span>{this.state.currentUser.fullName}</span></h2>
            <p>You can manage your account, preferences, and much more using our unified login system</p>
        </section>
    )
    panes = [
        {
            menuItem: <Menu.Item key='profile'>
                <Account icon={faUser} title={'Profile'} subtitle={"Account setting"} />
            </Menu.Item>,
            render: () => <Tab.Pane attached={false}><GeneralSetting currentUser={this.state.currentUser}/></Tab.Pane>,
        },
        {
            menuItem: <Menu.Item key='KYC'>
                <Account icon={faTasks} title={'KYC'} subtitle={"Account Verification"} />
            </Menu.Item>,
            render: () => <Tab.Pane attached={false}><Kyc currentUser={this.state.currentUser}/></Tab.Pane>,
        },
        {
            menuItem: (
                <Menu.Item key='deposite'>
                    <Account icon={faBalanceScale} title={'Deposit & Withdraw'} subtitle={"Withdraw or deposit balance from/to your account"} />
                </Menu.Item>
            ),
            render: () => <Tab.Pane attached={false}><WithdrawDeposite currentUser={this.state.currentUser}/></Tab.Pane>,
        },
        {
            menuItem: <Menu.Item key='transaction'>
                <Account icon={faExchangeAlt} title={'Transaction'} subtitle={"View your transaction history"} />
            </Menu.Item>,
            render: () => <Tab.Pane attached={false}><Transactions currentUser={this.state.currentUser}/></Tab.Pane>,
        },
        {
            menuItem: (
                <Menu.Item key='2fa'>
                    <Account icon={faLock} title={'2FA'} subtitle={"Enable your 2-Factor Authentication."} />
                </Menu.Item>
            ),
            render: () => <Tab.Pane attached={false}><TwoFA/></Tab.Pane>,
        },
        {
            menuItem: (
                <Menu.Item  key='logout'>
                    <Account icon={faSignOutAlt} title={'Logout'} subtitle={"Sign Out"} />
                </Menu.Item>
            ),
            render: () => <Tab.Pane attached={false}><Logout user={null} {...this.props}/></Tab.Pane>,
        },
    ]
    render() {
        return (
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle'>
                    <Grid.Column style={{maxWidth:1355}}>
                        {this.renderBanner()}
                        <Tab className={"account_tab"}
                            menu={{ fluid: true,tabular: true,pointing: true, vertical: true }}
                            menuPosition='left'
                            panes={this.panes}
                        />
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    };
}

const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser
});
export default connect(mapStateToProps)(UserAccount);
