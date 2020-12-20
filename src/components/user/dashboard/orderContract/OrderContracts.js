import React, {Component, useEffect} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table,Tab} from "semantic-ui-react";
import OrderRow from "./OrderRow";


const OrderContracts =(props)=>{
    useEffect(()=>{
        props.refetch();
    })
    const panes = [
        { menuItem: 'Main Network', render:()=>  <OrderRow orders={props.user.orders}/>},
        { menuItem: 'Test Network', render:()=>  <OrderRow orders={props.user.testOrders}/> },
    ]
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Ordered <span>Contract & Dapps</span></strong></h1>
            <Tab className={"order_tab"}
                menu={{ fluid: true,tabular: true }}
                panes={panes}
            />

        </DashboardLayout>
    );
}

export default (OrderContracts);