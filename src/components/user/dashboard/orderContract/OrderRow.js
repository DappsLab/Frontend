import React, {Component} from 'react';
import  {Table} from "semantic-ui-react";
import {Link} from "react-router-dom";



class OrderRow extends Component {
    handelDeveloped(){
        const data = this.props.orders;
        console.log(this.props.orders)
            return data.map((order,index)=>{
                return <Table.Row key={order.id} >
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell width={4}>{order.smartContract.contractName}</Table.Cell>
                    <Table.Cell width={7} className={"link"}><Link  to={`/block_explorer/transaction:${order.transactionHash}`}>{order.transactionHash}</Link></Table.Cell>
                    <Table.Cell width={1}>{order.price} Dapps</Table.Cell>
                    <Table.Cell width={2}>{order.dateTime}</Table.Cell>
                    <Table.Cell width={1} negative={order.status==="false"&&false} positive={order.status==="true"&&true}>{order.status}</Table.Cell>
                </Table.Row>
            })
        }
    render() {
        return (
            <Table.Body>
                {this.handelDeveloped()}
            </Table.Body>
        )
    }
}
export default (OrderRow);
