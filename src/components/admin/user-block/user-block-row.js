import React, {useState} from 'react';
import {Button, Icon, Table} from "semantic-ui-react";
import DeleteModal from "../../user/dashboard/developedContract/DeleteModel";
import {useMutation} from "@apollo/client";
import {blockUser,unBlockUser} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {withAlert} from "react-alert";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {makeStyles} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
const UnBlockRow = (props) => {
    const {users,request,history,alert}=props
    const [modalOpen,setModalOpen]=useState(false);
    const [blockID,setBlockID]=useState('');
    const [unBlockID,setUnBlockID]=useState('');
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
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
    const [unblock]=useMutation(unBlockUser,{ client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },
        onCompleted:data => {
            alert.success("UNBlock SUCCESSFULLY",{timeout:3000})
            setUnBlockID('')
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
    const unBlockAction=()=>{
        unblock({
            variables:{
                id:unBlockID
            }
        }).catch(err=>{
            console.log(err.toString())
        })
        closeModal();
    }

    return (
        <div className={'scroll'}>
            {request ?
                <Table className={"violet developed user-block-table striped "}>
                    <Table.Header>
                        <Table.Row className={classes.root}>
                            <Table.HeaderCell/>
                            <Table.HeaderCell>Full Name</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Email Status</Table.HeaderCell>
                            <Table.HeaderCell textAlign={'center'}>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.length > 0 && users.map((user, index) => (
                           <React.Fragment key={user.id}>
                               <Table.Row >
                                   <Table.Cell>
                                       <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                           {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                       </IconButton>
                                   </Table.Cell>
                                   <Table.Cell>{user.user.fullName}</Table.Cell>
                                   <Table.Cell>{user.user.userName}</Table.Cell>
                                   <Table.Cell>{user.user.email}</Table.Cell>
                                   <Table.Cell>
                                       <Button disabled className={'remove-opacity'} basic
                                               color={"green"}> VERIFIED</Button>
                                   </Table.Cell>
                                   <Table.Cell className={'action'} width={2}>
                                  <span onClick={() => {
                                      setUnBlockID(user.id)
                                      setModalOpen(true);
                                  }}> <Icon circular link inverted color='green' name='checkmark'/></span>
                                   </Table.Cell>
                               </Table.Row>
                               <Table.Row>
                                   <TableCell className={"kyc-details "} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                       <Collapse in={open} timeout="auto" unmountOnExit>
                                           <Box margin={1}>
                                               <Typography variant="h6" gutterBottom component="div">
                                                   Un Block Reason
                                               </Typography>
                                               <Table size="small"  aria-label="purchases">
                                                   <TableBody>
                                                       <TableRow>
                                                           <TableCell>{user.description}</TableCell>
                                                       </TableRow>
                                                   </TableBody>
                                               </Table>
                                           </Box>
                                       </Collapse>
                                   </TableCell>
                               </Table.Row>
                           </React.Fragment>
                        ))
                        }
                    </Table.Body>
                </Table> : <Table className={"violet developed striped "}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell>Full Name</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Email Status</Table.HeaderCell>
                            <Table.HeaderCell textAlign={'center'}>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.length > 0 && users.map((user, index) => (
                            <Table.Row key={user.id}>
                                <Table.Cell>{index+1} </Table.Cell>
                                <Table.Cell>{user.fullName}</Table.Cell>
                                <Table.Cell>{user.userName}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>
                                    <Button disabled className={'remove-opacity'} basic
                                            color={"green"}> VERIFIED</Button>
                                </Table.Cell>
                                <Table.Cell className={'action'} width={2}>
                                  <span onClick={() => {
                                      setBlockID(user.id)
                                      setModalOpen(true);
                                  }}> <Icon circular link inverted color='red' name='delete'/></span>
                                </Table.Cell>
                            </Table.Row>
                        ))
                        }
                    </Table.Body>
                </Table>
            }
            {request&&!users.length>0&& <div className={'zero-result'}>
                {users.length>0?"":"Found 0 UnBlock Request"}
            </div>}
            <DeleteModal
                block={!!blockID}
                unBlock={!!unBlockID}
                open={modalOpen}
                close={()=>setModalOpen(false)}
                deleteAction={blockID?delateAction:unBlockAction}
            />
        </div>
    );
};

export default withAlert() (UnBlockRow);
