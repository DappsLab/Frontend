import React, {Component} from 'react';
import {Button, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";



class OrderRow extends Component {
    handelDeveloped(){
        const data = this.props.orders;
        console.log(this.props.orders)
            return data.slice(0).reverse().map((order,index)=>{
                return <Table.Row key={order.id} >
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell >{order.smartContract!==null?order.smartContract.contractName:order.dApp.dAppName}</Table.Cell>
                    <Table.Cell  className={"link"}><Link  to={`/block_explorer/transaction:${order.transactionHash}`}>{order.transactionHash}</Link></Table.Cell>
                    <Table.Cell >{order.price} Dapps</Table.Cell>
                    <Table.Cell >{order.dateTime}</Table.Cell>
                    <Table.Cell >
                        <Button basic disabled color={order.status==='true'?'green':'red'}>{order.status}</Button>
                    </Table.Cell>
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
