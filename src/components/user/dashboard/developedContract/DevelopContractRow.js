import React, { useState} from 'react';

import  {Table,Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModel";
import {dateTime} from "../../../../helpers/DateTimeConversion";

const DevelopContractRow =(props)=>{
    const [modalOpen,setModalOpen]=useState(false);
    const closeModal=()=> {
        setModalOpen(false)
    }
    const delateAction=()=>{
        closeModal();
    }
    const HandelDeveloped=()=>{
        const smartContracts = props.smartContracts;
        return smartContracts.map((contract,index)=>{
            return <Table.Row key={contract.id} >
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell width={3}>{contract.contractName}</Table.Cell>
                <Table.Cell width={2}>{contract.singleLicensePrice}</Table.Cell>
                <Table.Cell width={2}>{contract.unlimitedLicensePrice}</Table.Cell>
                <Table.Cell width={3}>{dateTime( contract.publishingDateTime)}</Table.Cell>
                <Table.Cell width={1} negative={contract.verified!=="VERIFIED"&&true} positive={contract.verified==="VERIFIED"&&true}>{contract.verified}</Table.Cell>
                <Table.Cell  width={1}>
                    <Link to={`/edit_samrt_contract/${contract.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>
                    <span onClick={()=>{setModalOpen(true)}}> <Icon circular link  inverted color='red' name='delete'/></span>
                </Table.Cell>
            </Table.Row>
        })
    }
    return (
        <Table.Body>
            {HandelDeveloped()}
            <DeleteModal
                open={modalOpen}
                close={()=>setModalOpen(false)}
                deleteAction={delateAction}
            />
        </Table.Body>
    )
}

export default (DevelopContractRow);