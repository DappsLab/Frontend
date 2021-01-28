import React, { useState} from 'react';

import {Table, Icon, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModel";
import {getDate} from "../../../ui/Helpers";
import {useMutation} from "@apollo/client";
import {deleteSmartContract} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";

const DevelopContractRow =(props)=>{
    const [modalOpen,setModalOpen]=useState(false);
    const [deleteID,setDeleteID]=useState('');
    const closeModal=()=> {
        setModalOpen(false)
    }
    const {alert,history}=props
    const [deleteContract]=useMutation(deleteSmartContract,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },
        onCompleted:data => {
            alert.success(data.deleteSmartContract.message,{timeout:3000})
            setDeleteID('')
            history.push('/dashboard/developed_contract')
        },onError:error => {
            alert.error(error.toString(),{timeout:2000})
        }
    })
    const delateAction=()=>{
        deleteContract({
            variables:{
                id:deleteID
            }
        }).catch(err=>{
            console.log(err.toString())
        })
        closeModal();
    }
    const handleClick=(id)=>{
        history.push(`/detailed_contract/${id}`)
    }
    const HandelDeveloped=()=>{
        const smartContracts = props.smartContracts;
        return smartContracts.map((contract,index)=>{
            return <Table.Row key={contract.id} >
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell selectable onClick={() => {
                    handleClick(contract.id);
                }}>{contract.contractName}</Table.Cell>
                <Table.Cell >{contract.singleLicensePrice}</Table.Cell>
                <Table.Cell >{contract.unlimitedLicensePrice}</Table.Cell>
                <Table.Cell >{getDate( contract.publishingDateTime)}</Table.Cell>
                <Table.Cell >
                    <Button disabled className={'remove-opacity'} basic color={contract.verified==="VERIFIED"?"green":(contract.verified==="PENDING"?"yellow":'red')}> {contract.verified}</Button>
                </Table.Cell>
                <Table.Cell className={'action flex'} >
                    {contract.verified!=="VERIFIED"&&<Link to={`/edit_samrt_contract/${contract.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>}
                    <span onClick={()=>{
                        if (contract.verified==='VERIFIED'){
                            alert.info("VARIFIED SMART CONTRACT CANNOT BE DELETED",{timeout:3000})
                        }else {
                            setModalOpen(true);
                            setDeleteID(contract.id)
                        }
                    }}> <Icon circular link  inverted color='red' name='delete'/></span>
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

export default withAlert() (DevelopContractRow);