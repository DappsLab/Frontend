import React, {useEffect} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";
import DevelopContractRow from "../developedContract/DevelopContractRow";

const CustomOrder = (props) => {
    useEffect(()=>{
        props.refetch();
    })
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Requests <span>Smart Contract/Dapp</span></strong></h1>
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
};

export default CustomOrder;