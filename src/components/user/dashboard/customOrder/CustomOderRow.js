import React from 'react';
import {Button, Icon, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

const CustomOrderRow = ({orders}) => {
    return (
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
               <Table.Body>
                   {orders.length>0&&orders.map((order,index)=>(
                       <Table.Row key={order.id} >
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
                   ))
                   }
               </Table.Body>
            </Table>
            <div className={'zero-result'}>
                {orders.length>0?"":"0 Orders Found"}
            </div>
        </div>
    );
};

export default CustomOrderRow;
