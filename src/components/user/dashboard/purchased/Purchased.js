import React, {useEffect} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Tab} from 'semantic-ui-react'
import PurchasedRow from "./PurchasedRow";
import {withAlert} from "react-alert";


const Purchased =(props)=> {
    const {user}=props
    useEffect(()=>{
        props.refetch();
    });

    const panes = [
        { menuItem: 'Main Network', render:()=> <PurchasedRow {...props} purchased={user.purchasedContracts}/>},
        { menuItem: 'Test Network', render:()=> <PurchasedRow {...props} purchased={user.testPurchasedContracts}/> },
    ]
     return (
         <DashboardLayout user={user}>
             <h1> <strong>Purchased <span>Smart Contract</span></strong></h1>
             <Tab className={"order_tab"}
                  menu={{ fluid: true,tabular: true }}
                  panes={panes}
             />

         </DashboardLayout>
     );
}

export default withAlert()(Purchased);