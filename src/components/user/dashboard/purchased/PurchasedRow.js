import React from 'react';
import {Table} from "semantic-ui-react";

const PurchasedRow = (props) => {
    const data=props.purchased
    const handleClick=(id)=>{
        props.history.push(`/detailed_contract/${id}`)
    }
    return <Table.Body>
        {data.map((da,index)=>{
            return   <Table.Row  key={da.id}  onClick={() => {
                    handleClick(da.smartContract.id);
                }} >
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell width={4}>{da.smartContract.contractName}</Table.Cell>
                    <Table.Cell width={7} >{da.customizationsLeft} </Table.Cell>
                </Table.Row>
        })}
    </Table.Body>
};

export default PurchasedRow;