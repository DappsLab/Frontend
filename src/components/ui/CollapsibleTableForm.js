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
import {
    verify_smart_contract,
    cancel_smart_contract,
    pendingSmartContract, getSource,
} from "../../queries/queries";
import {withAlert} from "react-alert";
import {useMutation, useQuery} from "@apollo/client";
import MEDitor from "@uiw/react-md-editor";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    error:{
        top:"0"
    }
});



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [verify] = useMutation(verify_smart_contract, {
        refetchQueries:mutationResult=>[{query:pendingSmartContract}],
        onCompleted:data=>{
            console.log(data)
        }
    });
    const [cancel]=useMutation(cancel_smart_contract, {
        refetchQueries:mutationResult=>[{query:pendingSmartContract}],
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
    const GetSources=(id)=>{
        const {loading,error,data}=useQuery(getSource,{
            variables:{id:id}
        });
        if (loading) return "Loading"
        if (error) return <div className={`errorMessage ${classes.error}`}>{error.toString()}</div>
        return data.getSource
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
                    {row.contractName}
                </TableCell>
                <TableCell>{row.publisher.fullName}</TableCell>
                <TableCell>{row.verified}</TableCell>
                <TableCell>{dateTime(row.publishingDateTime)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Smart Contract Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                <TableRow>
                                    <TableCell  style={{ width: 220 }}>Image</TableCell>
                                    <TableCell><img src={row.image} height={"80px"} width={"80px"} alt={"img"}/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: 220 }}>Single Price</TableCell>
                                    <TableCell>{row.singleLicensePrice} Dapps</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: 220 }}>Unlimited Price</TableCell>
                                    <TableCell>{row.unlimitedLicensePrice} Dapps</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: 220 }}>Contract Function Name</TableCell>
                                    <TableCell>{row.sourceContractName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: 220 }}>Cntract Source </TableCell>
                                    <TableCell>

                                        <MEDitor.Markdown source={GetSources(row.id)}  />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: 220 }}>Short Description</TableCell>
                                    <TableCell>{row.shortDescription}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ width: 220 }}>Description</TableCell>
                                    <TableCell>
                                        <MEDitor.Markdown source={row.description}  />
                                    </TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                            <Button onClick={()=>onVerify(row.id)} color={'green'}>Verified</Button>
                            <Button onClick={()=>onCancel(row.id)} color={'red'}>Rejected</Button>
                            <Button onClick={()=>{props.history.push(`/edit_samrt_contract/${row.id}`)}}  color={"blue"}>Edit</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


 function CollapsibleFormTable(props) {
    const {data}=props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Contract Name</TableCell>
                        <TableCell>Publisher Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row key={row.id} {...props}  row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default withAlert()(CollapsibleFormTable)