import React from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import { Table} from "semantic-ui-react";
import {dateTime} from "../../../../helpers/DateTimeConversion";
import DownlaodDapp from "../../../home/dapps/detailDApps/DownlaodDapp";

const PurchasedDapp = (props) => {
    const {user,user:{purchasedDApps}}=props
    return (
        <DashboardLayout user={user}>
            <h1> <strong>Purchased <span>Dapps</span></strong></h1>
            <div className={'scroll'}>
                <Table  className={"violet striped "}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell> Dapp Name</Table.HeaderCell>
                            <Table.HeaderCell > Publisher Name</Table.HeaderCell>
                            <Table.HeaderCell>Date and Time</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Downlaod</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {purchasedDApps.length>0&&purchasedDApps.map((data,index)=>{
                        return   <Table.Row  key={data.id} >
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell >{data.dApp.dAppName}</Table.Cell>
                            <Table.Cell >{data.dApp.publisher.fullName}</Table.Cell>
                            <Table.Cell>{dateTime(data.dApp.createdAt)}</Table.Cell>
                            <Table.Cell className={'dapp-spinner'}><DownlaodDapp check={false} purchased={data}/></Table.Cell>
                        </Table.Row>
                    })}
                    </Table.Body>
                </Table>
                {!purchasedDApps.length>0&&<div className={'zero-result'}>
                    Found 0 Purchased Dapps
                </div>}
            </div>
        </DashboardLayout>
    );
};

export default PurchasedDapp;