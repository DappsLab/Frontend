import React, {useEffect} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Button, Icon, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

const CustomOrder = (props) => {
    useEffect(()=>{
        props.refetch();
    })
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Custom orders of <span>Smart Contract/Dapp</span></strong></h1>
            <div className={'scroll'}>
                <Table className={"violet developed striped "} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell >Business Name</Table.HeaderCell>
                            <Table.HeaderCell >Business Email</Table.HeaderCell>
                            <Table.HeaderCell >Phone No.</Table.HeaderCell>
                            <Table.HeaderCell >Website</Table.HeaderCell>
                            <Table.HeaderCell >Status</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {props.user.customOrders.length>0&&props.user.customOrders.map((order,index)=>{
                            return <Table.Row key={order.id} >
                                <Table.Cell>{index+1}</Table.Cell>
                                <Table.Cell width={3}>{order.businessName}</Table.Cell>
                                <Table.Cell width={2}>{order.businessEmail}</Table.Cell>
                                <Table.Cell width={2}>{order.businessPhone}</Table.Cell>
                                <Table.Cell width={3}>{order.businessWebsite}</Table.Cell>
                                <Table.Cell width={1} >
                                    <Button disabled className={'remove-opacity'} basic color={order.status==="VERIFIED"?"green":(order.status==="PENDING"?"yellow":'red')}> {order.status}</Button>
                                </Table.Cell>
                                <Table.Cell className={'action flex'}  width={1}>
                                    {order.status!=="VERIFIED"&&<Link to={`/edit_custom_order/${order.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>}
                                    <span> <Icon circular link  inverted color='red' name='delete'/></span>
                                </Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table>
                <div>
                    {props.user.customOrders.length>0?"":"NO Orders"}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CustomOrder;