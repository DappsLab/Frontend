import React, {Component} from 'react';
import {graphql} from "react-apollo";
import { getContract} from "../../../../queries/queries";
import {flowRight as compose} from "lodash";
import  {Table} from "semantic-ui-react";



class OrderRow extends Component {

    handelDeveloped(){
        const data = this.props.orders;
        console.log(this.props)
            return data.map((order,index)=>{
                return <Table.Row key={order.id} >
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell width={3}>{order.smartContract.contractName}</Table.Cell>
                    <Table.Cell width={2}>{order.transactionHash}</Table.Cell>
                    <Table.Cell width={2}>{order.price}</Table.Cell>
                    <Table.Cell width={3}>{order.dateTime}</Table.Cell>
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

export default compose(
    graphql(getContract, {
        options: (props) => {
            return {
                variables: {
                    id:props.id
                }
            }
        }
    })
)(OrderRow);