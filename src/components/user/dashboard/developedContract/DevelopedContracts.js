import React, { useEffect} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";
import {connect} from "react-redux";
import DevelopContractRow from "./DevelopContractRow";
import {setUser} from "../../../../actions/Actions";


const DevelopedContracts =(props)=> {
    useEffect(()=>{
        props.refetch();
    })
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Developed <span>Smart Contract</span></strong></h1>
            <div className={'scroll'}>
            <Table className={"violet developed striped "} >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No </Table.HeaderCell>
                        <Table.HeaderCell > Contract Name</Table.HeaderCell>
                        <Table.HeaderCell >Single Price</Table.HeaderCell>
                        <Table.HeaderCell >Unlimited Price</Table.HeaderCell>
                        <Table.HeaderCell >Created Date</Table.HeaderCell>
                        <Table.HeaderCell >Status</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <DevelopContractRow smartContracts={props.user.smartContracts}/>
            </Table>
            </div>
        </DashboardLayout>
    );
}

export default connect(null,{setUser})(DevelopedContracts);