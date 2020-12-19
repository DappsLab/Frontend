import React, {useState} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Button, Table} from "semantic-ui-react";
import {categoryColors} from "../../../ui/Helpers";
import {dateTime} from "../../../../helpers/DateTimeConversion";
import DownlaodDapp from "../../../home/dapps/detailDApps/DownlaodDapp";

const PurchasedDapp = (props) => {
    const [user,setUser]=useState(props.user)
    const dapp=user.purchasedDApps;
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
                    {dapp.length>0?(
                    dapp.map((data,index)=>{
                        return   <Table.Row  key={data.id} >
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell >{data.dApp.dAppName}</Table.Cell>
                            <Table.Cell >{data.dApp.publisher.fullName}</Table.Cell>
                            <Table.Cell>{dateTime(data.dApp.createdAt)}</Table.Cell>
                            <Table.Cell><DownlaodDapp check={false} purchased={data}/></Table.Cell>
                        </Table.Row>
                    })):
                        <Table.Row>
                            <Table.Cell style={{textAlign:"center"}}> </Table.Cell>
                            <Table.Cell style={{textAlign:"center"}}> </Table.Cell>
                            <Table.Cell style={{textAlign:"center"}}>
                                NO Data
                            </Table.Cell>
                            <Table.Cell style={{textAlign:"center"}}> </Table.Cell>
                        </Table.Row>
                    }
                    </Table.Body>
                </Table>
            </div>
        </DashboardLayout>
    );
};

export default PurchasedDapp;