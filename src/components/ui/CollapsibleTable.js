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
import {dateTime} from "../../helpers/DateTimeConversion";
import {Button} from "semantic-ui-react";
import {verifyKyc, cancelKyc, pending_kyc_query} from "../../queries/queries";
import {useMutation} from "@apollo/client";
import {withAlert} from "react-alert";
import {getDate} from "./Helpers";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [verify] = useMutation(verifyKyc, {
        refetchQueries:mutationResult=>[{query:pending_kyc_query}],
        onCompleted:data=>{
            console.log(data)
        }
    });
    const [cancel]=useMutation(cancelKyc, {
        refetchQueries:mutationResult=>[{query:pending_kyc_query}],
        onCompleted:data=>{
            console.log(data)
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                               User KYC Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                               <TableBody>
                                <TableRow>
                                    <TableCell>Street No</TableCell>
                                    <TableCell>{row.kyc.street}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Building</TableCell>
                                    <TableCell>{row.kyc.building}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Postal Code</TableCell>
                                    <TableCell>{row.kyc.postalCode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nationality</TableCell>
                                    <TableCell>{row.kyc.nationality}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Mobile Number</TableCell>
                                    <TableCell>{row.kyc.mobile}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>{row.kyc.dateOfBirth}</TableCell>
                                </TableRow>
                               </TableBody>
                            </Table>
                            <Button onClick={()=>onVerify(row.id)} color={'green'}>Verified</Button>
                            <Button onClick={()=>onCancel(row.id)} color={'red'}>Rejected</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


 function CollapsibleTable(props) {
    const {data}=props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
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
                        <Row key={row.id} {...props} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default  withAlert()(CollapsibleTable);