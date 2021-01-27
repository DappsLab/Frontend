import React, { useEffect} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Tab} from "semantic-ui-react";
import OrderRow from "./OrderRow";


const OrderContracts =(props)=>{
    useEffect(()=>{
        props.refetch();
    })
    const {orders,testOrders}=props.user

    const panes = [
        { menuItem: 'Main Network', render:()=>  <OrderRow orders={orders}/>},
        { menuItem: 'Test Network', render:()=>  <OrderRow orders={testOrders}/> },
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