import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import { Table} from 'semantic-ui-react'
import PurchasedRow from "./PurchasedRow";
import {withAlert} from "react-alert";


const Purchased =(props)=> {
    const [user,setUser]=useState(props.user)
     return (
         <DashboardLayout user={user}>
             <h1> <strong>Purchased <span>Smart Contract</span></strong></h1>
             <div className={'scroll'}>
                 <Table selectable className={"violet striped "}>
                     <Table.Header>
                         <Table.Row>
                             <Table.HeaderCell width={1}>No </Table.HeaderCell>
                             <Table.HeaderCell> Contract Name</Table.HeaderCell>
                             <Table.HeaderCell > Publisher Name</Table.HeaderCell>
                             <Table.HeaderCell>Customized Left</Table.HeaderCell>
                             <Table.HeaderCell>Contract Category</Table.HeaderCell>
                            </Table.Row>
                         </Table.Header>
                     {<PurchasedRow {...props} purchased={user.purchasedContracts}/>}
                 </Table>
             </div>
         </DashboardLayout>
     );
}

export default withAlert()(Purchased);