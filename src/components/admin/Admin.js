import React, { useState} from 'react';
import "../../assets/scss/admin.css"
import {Menu, Tab} from "semantic-ui-react";
import {Account} from "../ui/AccountNav";
import { faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import KycVerification from "./kyc_verification/KYCVerification";
import SmartContractVerification from "./smart_contract_verification/SmartContractVerification";



const Admin =(props)=> {
    const [currentUser,setCurrentUser]=useState(props.currentUser)
   const panes = [
        {
            menuItem: <Menu.Item key='KYC'>
                <Account icon={faUser} title={'KYC'} subtitle={"Account setting"} />
            </Menu.Item>,
            render: () => <Tab.Pane attached={false}><KycVerification  {...props} currentUser={currentUser}/></Tab.Pane>,
        },
        {
            menuItem: <Menu.Item key='Contract'>
                <Account icon={faTasks} title={'Smart Contract '} subtitle={"Account Verification"} />
            </Menu.Item>,
            render: () => <Tab.Pane attached={false}><SmartContractVerification {...props} currentUser={currentUser}/></Tab.Pane>,
        }
    ]
        return (
            <section className={"admin_container"}>
                <h2>Verify Smart Contact and KYC</h2>
                <Tab
                    menu={{ fluid: true,tabular: true,pointing: true, vertical: true }}
                    menuPosition='left'
                    panes={panes}
                />
            </section>
        );
}

export default  (Admin);
