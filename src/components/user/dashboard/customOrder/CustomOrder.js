import React from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Tab, } from "semantic-ui-react";

import CustomOrderRow from "./CustomOderRow";

const CustomOrder = (props) => {
    const {user}=props

    const myOrders=()=>{
       return <CustomOrderRow orders={user.customOrders}/>
    }
    const allOrders=()=>{
       return <CustomOrderRow orders={user.customOrders}/>
    }
    const panes = [
        { menuItem: 'My Order', render:()=> myOrders() },
        { menuItem: 'Others Order', render:()=>  allOrders() },

    ]
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Custom orders of <span>Smart Contract/Dapp</span></strong></h1>
            {user.type === "ADMIN" || user.type === 'DEVELOPER' ?
                <Tab className={"order_tab"}
                      menu={{fluid: true, tabular: true}}
                      panes={panes}
                />
                : <CustomOrderRow orders={user.customOrders}/>
            }
        </DashboardLayout>
    );
};

export default CustomOrder;