import React, {useState} from 'react';
import {Button, Icon, Table} from "semantic-ui-react";
import DeleteModal from "../../user/dashboard/developedContract/DeleteModel";
import {useMutation} from "@apollo/client";
import {blockUser} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {withAlert} from "react-alert";

const UnBlockRow = (props) => {
    const {users,request,history,alert}=props
    const [modalOpen,setModalOpen]=useState(false);
    const [blockID,setBlockID]=useState('');
    const closeModal=()=> {
        setModalOpen(false)
    }
    const [block]=useMutation(blockUser,{ client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },
        onCompleted:data => {
                alert.success("BLOCKED SUCCESSFULLY",{timeout:3000})
                setBlockID('')
                history.push('/dashboard/block_users')
        },onError:error => {
            alert.error(error.toString(),{timeout:2000})
        }
    })
    const delateAction=()=>{
        block({
            variables:{
                id:blockID
            }
        }).catch(err=>{
            console.log(err.toString())
        })
        closeModal();
    }
    console.log(request)
    return (
        <div className={'scroll'}>
            <Table className={"violet developed striped "} >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No </Table.HeaderCell>
                        <Table.HeaderCell >Full Name</Table.HeaderCell>
                        <Table.HeaderCell >Username</Table.HeaderCell>
                        <Table.HeaderCell >Email</Table.HeaderCell>
                        <Table.HeaderCell >Email Status</Table.HeaderCell>
                        <Table.HeaderCell textAlign={'center'} >Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {request&&users.length>0?users.map((user,index)=>(
                        <Table.Row key={user.id} >
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell >{user.fullName}</Table.Cell>
                            <Table.Cell >{user.userName}</Table.Cell>
                            <Table.Cell >{user.email}</Table.Cell>
                            <Table.Cell >{user.email}</Table.Cell>
                            <Table.Cell  >
                                <Button disabled className={'remove-opacity'} basic color={"green"}> VERIFIED</Button>
                            </Table.Cell>
                            <Table.Cell  className={'action'}   width={2}>
                              <span onClick={()=>{
                                      setModalOpen(true);
                                      setBlockID(user.id)
                              }}> <Icon circular link  inverted color='red' name='delete'/></span>
                            </Table.Cell>
                        </Table.Row>
                    )):users.length>0&&users.map((user,index)=>(
                        <Table.Row key={user.id} >
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell >{user.fullName}</Table.Cell>
                            <Table.Cell >{user.userName}</Table.Cell>
                            <Table.Cell >{user.email}</Table.Cell>
                            <Table.Cell  >
                                <Button disabled className={'remove-opacity'} basic color={"green"}> VERIFIED</Button>
                            </Table.Cell>
                            <Table.Cell  className={'action'}   width={2}>
                              <span onClick={()=>{
                                  setModalOpen(true);
                                  setBlockID(user.id)
                              }}> <Icon circular link  inverted color='red' name='delete'/></span>
                            </Table.Cell>
                        </Table.Row>
                    ))
                    }
                </Table.Body>
            </Table>
            {request&&!users.length>0&& <div className={'zero-result'}>
                {users.length>0?"":"Found 0 UnBlock Request"}
            </div>}
            <DeleteModal
                block
                open={modalOpen}
                close={()=>setModalOpen(false)}
                deleteAction={delateAction}
            />
        </div>
    );
};

export default withAlert() (UnBlockRow);
