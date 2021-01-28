import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {dateTime} from "../../../helpers/DateTimeConversion";
import {Button} from "semantic-ui-react";
import {verifyKyc, cancelKyc} from "../../../queries/queries";
import {useMutation} from "@apollo/client";
import {withAlert} from "react-alert";
import {Client} from "../../../queries/Services";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row,fetch } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [verify] = useMutation(verifyKyc, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,
        // refetchQueries:mutationResult=>[{query:pending_kyc_query, context: {
        //         headers: {
        //             authorization: localStorage.getItem("token")
        //         }
        //     }
        // }],
        onCompleted:data=>{
            if (data){
                alert.success("VERIFIED SUCCESSFULLY",{timeout:2000})
                fetch();
            }
        }
    });
    const [cancel]=useMutation(cancelKyc, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,
        // refetchQueries:mutationResult=>[{query:pending_kyc_query, context: {
        //         headers: {
        //             authorization: localStorage.getItem("token")
        //         }
        //     }
        // }],
        onCompleted:data=>{
            if (data){
                alert.success("REJECTED SUCCESSFULLY",{timeout:2000})
                fetch();
            }
        }
    });
    const alert=props.alert;
    function onVerify(id) {
        verify({variables: {id:id}}).catch(error=>{
            alert.error(error.toString(),{timeout:5000})
        })
    }
    function onCancel(id){
        cancel({variables: {id:id}}).catch(error=>{
            alert.error(error.toString(),{timeout:5000})
        })
    }
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.fullName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{dateTime(row.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={"kyc-details"} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                               User KYC Details
                            </Typography>
                            <Table size="small"  aria-label="purchases">
                               <TableBody>
                                <TableRow>
                                    <TableCell><strong>Street No: </strong>{row.kyc.street}</TableCell>
                                    <TableCell><strong>Building: </strong> {row.kyc.building}</TableCell>
                                    <TableCell><strong>Date of Birth: </strong> {row.kyc.birthDate}</TableCell>
                                    <TableCell>  <Button size={'mini'} onClick={()=>onVerify(row.id)} color={'green'}>Verified</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Postal Code :</strong> {row.kyc.postalCode}</TableCell>
                                    <TableCell><strong>Nationality :</strong> {row.kyc.nationality}</TableCell>
                                    <TableCell><strong>Mobile Number: </strong> {row.kyc.mobile}</TableCell>
                                    <TableCell> <Button size={'mini'} onClick={()=>onCancel(row.id)} color={'red'}>Rejected</Button> </TableCell>
                                </TableRow>
                               </TableBody>
                            </Table>


                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


 function CollapsibleKycTable(props) {
    const {data,fetch}=props;
    return (
        <div className={'scroll'}>
        <TableContainer className={'kyc-verification'} component={Paper}>
            <Table   aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Full Name</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Location</TableCell>
                        <TableCell >Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row fetch={fetch} key={row.id} {...props} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}
export default  withAlert()(CollapsibleKycTable);