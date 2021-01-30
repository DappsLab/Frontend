import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useMutation} from "@apollo/client";
import {cancelCustomeOrder, verifyCustomeOrder} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {dateTime} from "../DateTimeConversion";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Button} from "semantic-ui-react";
import {makeStyles} from "@material-ui/core/styles";
import {withAlert} from "react-alert";

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
    const [verify] = useMutation(verifyCustomeOrder, {
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
                alert.success("Verified Successfully",{timeout:2000})
                fetch();
            }
        }
    });
    const [cancel]=useMutation(cancelCustomeOrder, {
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
                alert.success("REJECTED Successfully",{timeout:2000})
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
                    {row.businessName}
                </TableCell>
                <TableCell>{row.businessEmail}</TableCell>
                <TableCell>{row.businessPhone}</TableCell>
                <TableCell>{dateTime(row.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={"kyc-details"} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Custom Order Details
                            </Typography>
                            <Table size="small"  aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Business Name: </strong>{row.businessName}</TableCell>
                                        <TableCell><strong>Business Email: </strong> {row.businessEmail}</TableCell>
                                        <TableCell><strong>Business Phone: </strong> {row.businessPhone}</TableCell>
                                        <TableCell>  <Button size={'mini'} onClick={()=>onVerify(row.id)} color={'green'}>Verified</Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Product Type :</strong> {row.productType}</TableCell>
                                        <TableCell><strong>Website Link :</strong> {row.businessWebsite}</TableCell>
                                        <TableCell><strong>Created At : </strong> {dateTime(row.createdAt)}</TableCell>
                                        <TableCell> <Button size={'mini'} onClick={()=>onCancel(row.id)} color={'red'}>Rejected</Button> </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4}><strong>Requirement : </strong> {row.requirements}</TableCell>
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

const CustomeOrderTabel = (props) => {
    const {data,fetch}=props;
    console.log(data)
    return (
        <div className={'scroll'}>
            <TableContainer className={'kyc-verification'} component={Paper}>
                <Table   aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Business Name</TableCell>
                            <TableCell > Business Email</TableCell>
                            <TableCell >Phone Numebr</TableCell>
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
};

export default withAlert()(CustomeOrderTabel);
