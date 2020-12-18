import React from 'react';
import {Button, Table} from "semantic-ui-react";
import {categoryColors} from "../../../ui/Helpers";

const PurchasedRow = (props) => {
    const data=props.purchased
    const handleClick=(id)=>{
        props.history.push(`/detailed_contract/${id}`)
    }
    return <Table.Body>
        {data.map((da,index)=>{
            return   <Table.Row className={'cursor'} key={da.id}  onClick={() => {
                    handleClick(da.smartContract.id);
                }} >
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell >{da.smartContract.contractName}</Table.Cell>
                    <Table.Cell >{da.smartContract.publisher.fullName}</Table.Cell>
                    <Table.Cell  >{da.customizationsLeft} </Table.Cell>
                    <Table.Cell>{da.smartContract.contractCategory.map(category=>{
                        return <Button key={category} size={"mini"} disabled style={{color:"#fff",backgroundColor:`${categoryColors(category)}`,padding:"10px 5px"}}>{category}</Button>
                    })}</Table.Cell>
                </Table.Row>
        })}
    </Table.Body>
};

export default PurchasedRow;