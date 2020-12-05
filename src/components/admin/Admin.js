import React,{Component} from 'react';
import {connect} from 'react-redux';
import "../../assets/scss/admin.css"
import Layout from "../../hoc/Layout";
import {Menu, Tab} from "semantic-ui-react";
import {Account} from "../ui/AccountNav";
import { faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import KycVerification from "./kyc_verification/KYCVerification";
import SmartContractVerification from "./smart_contract_verification/SmartContractVerification";



class Admin extends Component {
    state={
        currentUser:this.props.currentUser
    }
    panes = [
        {
            menuItem: <Menu.Item key='KYC'>
                <Account icon={faUser} title={'KYC'} subtitle={"Account setting"} />
            </Menu.Item>,
            render: () => <Tab.Pane attached={false}><KycVerification currentUser={this.state.currentUser}/></Tab.Pane>,
        },
        {
            menuItem: <Menu.Item key='Contract'>
                <Account icon={faTasks} title={'Smart Contract '} subtitle={"Account Verification"} />
            </Menu.Item>,
            render: () => <Tab.Pane attached={false}><SmartContractVerification currentUser={this.state.currentUser}/></Tab.Pane>,
        }
    ]
    render() {

        return (
            <section className={"admin_container"}>
                <h2>Verify Smart Contact and KYC</h2>
                <Tab
                    menu={{ fluid: true,tabular: true,pointing: true, vertical: true }}
                    menuPosition='left'
                    panes={this.panes}
                />
            </section>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser
});

export default connect(mapStateToProps)(Admin);
