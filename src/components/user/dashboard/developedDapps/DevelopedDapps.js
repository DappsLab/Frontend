import React, {useEffect} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {setUser} from "../../../../actions/Actions";
import DappsRow from "./DappsRow";

const DevelopedDapps = (props) => {
    useEffect(()=>{
        props.refetch();
    })
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Developed <span>Dapps</span></strong></h1>
            <div className={'scroll'}>
            <Table  className={"violet developed striped "} >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No </Table.HeaderCell>
                        <Table.HeaderCell > Dapps Name</Table.HeaderCell>
                        <Table.HeaderCell >Single Price</Table.HeaderCell>
                        <Table.HeaderCell >Created Date</Table.HeaderCell>
                        <Table.HeaderCell >Status</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <DappsRow smartContracts={props.user.dApps}/>
            </Table>
            </div>
        </DashboardLayout>
    );
};

export default connect(null, {setUser})(DevelopedDapps);