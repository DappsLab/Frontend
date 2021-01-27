import React, {useState} from 'react';

import {Button, Icon, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getDate} from "../../../ui/Helpers";
import DeleteModal from "../developedContract/DeleteModel";
import {withAlert} from "react-alert";
import {useMutation} from "@apollo/client";
import {deleteDApp} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";

const DappsRow =({alert,smartContracts,history})=>{
    const [modalOpen,setModalOpen]=useState(false);
    const [deleteID,setDeleteID]=useState('');
    const closeModal=()=> {
        setModalOpen(false)
    }
    const [removeDApp]=useMutation(deleteDApp,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },
        onCompleted:data => {
            alert.success(data.deleteDApp.message,{timeout:3000})
            setDeleteID('')
            history.push('/dashboard/developed_dapps')
        },onError:error => {
            alert.error(error.toString(),{timeout:2000})
        }
    })
    const delateAction=()=>{
        removeDApp({
            variables:{
                id:deleteID
            }
        }).catch(err=>{
            console.log(err.toString())
        })
        closeModal();
    }

    const HandelDeveloped=()=>{
        return smartContracts.map((contract, index)=>{
            return <Table.Row key={contract.id} >
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell width={3}>{contract.dAppName}</Table.Cell>
                <Table.Cell width={2}>{contract.singleLicensePrice}</Table.Cell>
                <Table.Cell width={3}>{getDate( contract.publishingDateTime)}</Table.Cell>
                <Table.Cell width={1}>
                    <Button disabled className={'remove-opacity'} basic color={contract.verified==="VERIFIED"?"green":(contract.verified==="PENDING"?"yellow":'red')}> {contract.verified}</Button>
                </Table.Cell>
                <Table.Cell className={'action'}  width={1}>
                    {contract.verified!=="VERIFIED"&&<Link to={`/edit_dapp/${contract.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>}
                    <span onClick={()=>{
                       if (contract.verified==='VERIFIED'){
                           alert.info("VARIFIED DAPP CANNOT BE DELETED",{timeout:3000})
                       }else {
                           setDeleteID(contract.id)
                           setModalOpen(true)
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

export default withAlert()(DappsRow);