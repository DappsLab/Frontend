import React from 'react';
import {Button, Table} from "semantic-ui-react";
import {categoryColors} from "../../../ui/Helpers";

const PurchasedRow = (props) => {
    const {purchased,history}=props
    const handleClick=(id)=>{
        history.push(`/detailed_contract/${id}`)
    }
    return  <div className={'scroll'}>
        <Table selectable className={"striped "}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>No </Table.HeaderCell>
                    <Table.HeaderCell> Contract Name</Table.HeaderCell>
                    <Table.HeaderCell > Publisher Name</Table.HeaderCell>
                    <Table.HeaderCell>Customized Left</Table.HeaderCell>
                    <Table.HeaderCell>Contract Category</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {purchased.length>0&&purchased.map((puchase,index)=>{
                    return   <Table.Row className={'cursor'} key={puchase.id}  onClick={() => {
                            handleClick(puchase.smartContract.id);
                        }} >
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell >{puchase.smartContract.contractName}</Table.Cell>
                            <Table.Cell >{puchase.smartContract.publisher.fullName}</Table.Cell>
                            <Table.Cell  >{puchase.customizationsLeft} </Table.Cell>
                            <Table.Cell>{puchase.smartContract.contractCategory.map(category=>{
                                return <Button key={category} size={"mini"} disabled style={{color:"#fff",backgroundColor:`${categoryColors(category)}`,padding:"10px 5px"}}>{category}</Button>
                            })}</Table.Cell>
                        </Table.Row>
                })}
            </Table.Body>
        </Table>
        {!purchased.length>0&&<div className={'zero-result'}>
            Found 0 Purchased Smart Contract
        </div>}
    </div>
};

export default PurchasedRow;