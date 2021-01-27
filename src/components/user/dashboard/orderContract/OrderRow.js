import React from 'react';
import {Button, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getDate} from "../../../ui/Helpers";



const OrderRow =(props)=> {
    const {orders}=props
    const handelDeveloped=()=>{
            return orders.slice(0).reverse().map((order,index)=>{
                return <Table.Row key={order.id} >
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell >{order.smartContract!==null?order.smartContract.contractName:order.dApp.dAppName}</Table.Cell>
                    <Table.Cell  className={"link"}><Link  to={`/block_explorer/transaction:${order.transactionHash}`}>{order.transactionHash}</Link></Table.Cell>
                    <Table.Cell >{order.price} Dapps</Table.Cell>
                    <Table.Cell >{getDate(order.dateTime)}</Table.Cell>
                    <Table.Cell >
                        <Button basic disabled color={order.status==='true'?'green':'red'}>{order.status}</Button>
                    </Table.Cell>
                </Table.Row>
            })
        }
    return (
        <div className={'scroll'}>
            <Table className={" striped "} >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No </Table.HeaderCell>
                        <Table.HeaderCell > Contract Name</Table.HeaderCell>
                        <Table.HeaderCell >Transaction Hash</Table.HeaderCell>
                        <Table.HeaderCell >Price</Table.HeaderCell>
                        <Table.HeaderCell >Date and Time</Table.HeaderCell>
                        <Table.HeaderCell >Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {orders.length>0&&handelDeveloped()}
                </Table.Body>
            </Table>
            {!orders.length>0&&<div className={'zero-result'}>
                0 Orders Found
            </div>}
        </div>
    )
}
export default (OrderRow);
